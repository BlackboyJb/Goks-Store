"use server";

import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema } from "../validators";

export async function addToCartItem(data: cartItem) {
  try {
    //check for the cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Cart session not found");

    ///Get session and user Id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    // Get cart
    const cart = await getMyCart();

    // Parse and validate item
    const item = cartItemSchema.parse(data);

    //TESTING
    console.log({
      sessionCartId: sessionCartId,
      userId: userId,
      itemRequested: item,
    });
    return {
      success: true,
      message: "Item Added to Cart",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart() {
  //check for the cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;

  if (!sessionCartId) throw new Error("Cart session not found");

  ///Get session and user Id
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  //Get user Cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  const toTwoDecimalString = (num) =>
    typeof num === "number" ? num.toFixed(2) : parseFloat(num).toFixed(2);

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: toTwoDecimalString(cart.itemsPrice),
    totalPrice: toTwoDecimalString(cart.totalPrice),
    shippingPrice: toTwoDecimalString(cart.shippingPrice),
    taxPrice: toTwoDecimalString(cart.taxPrice),
  });
}
