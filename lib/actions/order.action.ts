"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.action";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItem, PaymentResult } from "@/types";
import { paypal } from "../paypal";
import { revalidatePath } from "next/cache";
import { PAGE_SIZE } from "../constants";

//create order and create the order Items
export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not Authenticated");

    const cart = await getMyCart();
    const userId = session?.user?.id;
    if (!userId) throw new Error("User not Found");

    const user = await getUserById(userId);

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your Cart is Empty",
        redirectTo: "/cart",
      };
    }

    if (!user.address) {
      return {
        success: false,
        message: "No shipping Address",
        redirectTo: "/shipping-address",
      };
    }

    if (!user.paymentMethod) {
      return {
        success: false,
        message: "No Payment Method Selected",
        redirectTo: "/payment-method",
      };
    }

    //create Order Object
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      totalPrice: cart.totalPrice,
      shippingPrice: cart.shippingPrice,
    });

    //create a transaction to create order and databse
    const insertOrderId = await prisma.$transaction(async (tx) => {
      ///create Order
      const insertOrder = await tx.order.create({ data: order });
      //create the orderItems from the CartItems
      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: { ...item, price: item.price, orderId: insertOrder.id },
        });
      }
      //clear cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      });
      return insertOrder.id;
    });
    if (!insertOrderId) throw new Error("Order not Created");
    return {
      success: true,
      message: "Order Created Succesfully",
      redirectTo: `/order/${insertOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatError(error) };
  }
}

//Get Order by Id
export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });

  return convertToPlainObject(data);
}

//create new Paypal Order
export async function createPaypalOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });

    if (order) {
      //create paypal order
      const payPalOrder = await paypal.createOrder(Number(order.totalPrice));

      //update order with paypal id
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentResult: {
            id: payPalOrder.id,
            email_address: "",
            status: "",
            pricePaid: 0,
          },
        },
      });
      return {
        success: true,
        message: "Item Order Created Succesfully",
        data: payPalOrder.id,
      };
    } else {
      throw new Error("Order not Found");
    }
  } catch (error) {
    return { sucess: false, message: formatError(error) };
  }
}

//Approve Paypal order and update Order to Paid
export async function approvePayPalOrder(
  orderId: string,
  data: { orderID: string }
) {
  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });
    if (!order) throw new Error("Order not found");

    const captureData = await paypal.capturePayment(data.orderID);

    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResult)?.id ||
      captureData.status !== "COMPLETED"
    ) {
      throw new Error("Error in Paypal Payment");
    }

    //Update Order to Paid
    await updateOrdertoPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
        PricePaid:
          captureData.purchase_units[0].payments?.captures[0]?.amount?.value,
      },
    });
    //@todo

    revalidatePath(`/order/${orderId}`);

    return { sucess: true, message: "Your Order has been Paid" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

//uodate order to Paid
async function updateOrdertoPaid({
  orderId,
  paymentResult,
}: {
  orderId: string;
  paymentResult?: PaymentResult;
}) {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
    },
  });
  if (!order) throw new Error("Order not found");

  if (order.isPaid) throw new Error("Order is Already Paid");

  //Transaction to Update order and account for product stock
  await prisma.$transaction(async (tx) => {
    //Iterarte over products and update stock
    for (const item of order.orderitems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.qty } },
      });
    }

    //Set the order to paid
    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      },
    });
  });

  //Get Updated order after transaction
  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });
  if (!updatedOrder) throw new Error("Order not Found");
}

///GET MY ORDER
export async function getMyOrders({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const session = await auth();
  if (!session) throw new Error("User not Authorized");

  const data = await prisma.order.findMany({
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    where: { userId: session?.user?.id! },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.order.count({
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    where: { userId: session?.user?.id! },
  });

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}
