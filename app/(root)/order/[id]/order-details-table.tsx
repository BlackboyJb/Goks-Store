"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDateTime, formatId } from "@/lib/utils";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { FormatCurrency } from "@/lib/utils";
import {
    PayPalButtons,
    PayPalScriptProvider,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {
    createPaypalOrder,
    approvePayPalOrder,
    UpdateOrdertoPaidonCOD,
    UpdateOrdertoDelivered
} from "@/lib/actions/order.action";
import { approveBudPayOrder } from "@/lib/actions/order.action";
import BudPayButtonComponent from "@/lib/budpay";


const OrderDetailsTable = ({
    order,
    paypalClientId,
    isAdmin,
    budpayApiKey

}: {
    order: Order;
    paypalClientId: string;
    isAdmin: boolean
    budpayApiKey: string;
}) => {

    const {
        id,
        shippingAddress,
        orderitems,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        isPaid,
        isDelivered,
        paidAt,
        deliveredAt,
    } = order;

    const PrintLoadingState = () => {
        const [{ isPending, isRejected }] = usePayPalScriptReducer();
        let status = "";

        if (isPending) {
            status = "Loading Paypal";
        } else if (isRejected) {
            status = "Error Loading Paypal";
        }
        return status;
    };

    const handleCreatePayPalOrder = async () => {
        const res = await createPaypalOrder(order.id);

        if (!res.success) {
            toast.error(res.message);
        } else {
            toast.success(res.message);
        }

        return res.data;
    };

    const generateUniqueReference = (orderId: string) => {
        return `BUD_${orderId}_${Date.now()}`; // Combines order ID and current timestamp
    };

    const handleApprovePayPalOrder = async (data: { orderID: string }) => {
        const res = await approvePayPalOrder(order.id, data)

        if (!res.success) {
            toast.error(res.message);
        } else {
            toast.success(res.message);
        }
    }

    //Button to mark as Paid
    const MarkasPaidButton = () => {
        const [isPending, startTransition] = useTransition()

        return (
            <Button type="button" disabled={isPending} onClick={() => startTransition(async () => {
                const res = await UpdateOrdertoPaidonCOD(order.id)

                if (!res.success) {
                    toast.error(res.message);
                } else {
                    toast.success(res.message);
                }
            })}>
                {isPending ? 'Processing...' : 'Mark as Paid'}
            </Button>
        )
    }

    //Button to mark as 
    const MarkasDeliveredButton = () => {
        const [isPending, startTransition] = useTransition()

        return (
            <Button type="button" disabled={isPending} onClick={() => startTransition(async () => {
                const res = await UpdateOrdertoDelivered(order.id)

                if (!res.success) {
                    toast.error(res.message);
                } else {
                    toast.success(res.message);
                }
            })}>
                {isPending ? 'Processing...' : 'Mark as Delivered'}
            </Button>
        )
    }


    //Budpay Config 
    const reference = generateUniqueReference(id.toString());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePaymentComplete = async (data: any) => {
        try {
            const res = await approveBudPayOrder(order.id, data); // new function to call server-side
            if (res.success) {
                toast.success("Order has been paid");
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePaymentCancel = (data: any) => {
        console.log('Payment cancelled:', data);
        toast.error('Payment cancelled');
    };



    return (
        <>
            <h1 className="py-4 text-2xl">Order Id : {formatId(id)}</h1>
            <div className="grid md:grid-cols-3 md:gap-5">
                <div className="md:col-span-2 space-y-4 overflow-x-auto">
                    <Card>
                        <CardContent className="p-3 gap-4">
                            <h2 className="text-xl pb-4">Payment Method</h2>
                            <p>{paymentMethod}</p>
                            {isPaid ? (
                                <Badge variant="secondary" className="mt-5">
                                    Paid at {formatDateTime(paidAt!).dateTime}
                                </Badge>
                            ) : (
                                <Badge variant="destructive" className="mt-5">
                                    Not Paid
                                </Badge>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="my-4">
                        <CardContent className="p-3 gap-5 break-words">
                            <h2 className="text-xl pb-4">Shipping Address Details</h2>
                            <p>{shippingAddress.fullName}</p>
                            <p>
                                {shippingAddress.streetAddress}, {shippingAddress.city},{" "}
                                {shippingAddress.country}.
                            </p>

                            {isDelivered ? (
                                <Badge variant="secondary" className="mt-5">
                                    Delivered at {formatDateTime(deliveredAt!).dateTime}
                                </Badge>
                            ) : (
                                <Badge variant="destructive" className="mt-5">
                                    Not Delivered
                                </Badge>
                            )}
                        </CardContent>
                    </Card>

                    <Card className=" my-4">
                        <CardContent className="p-3 gap-5">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead className="text-center">Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orderitems.map((item) => (
                                        <TableRow key={item.slug}>
                                            <TableCell>
                                                <Link
                                                    href={`/product/${item.slug}`}
                                                    className="flex items-center"
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        height={50}
                                                        width={50}
                                                    />
                                                    <span className="px-2">{item.name}</span>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-2">{item.qty}</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {FormatCurrency(item.price)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardContent className="p-4 gap-4 space-y-4">
                            <div className="flex justify-between">
                                <div>Item Price : </div>
                                <div>{FormatCurrency(itemsPrice)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Shipping Price :</div>
                                <div>{FormatCurrency(shippingPrice)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Total Price :</div>
                                <div>{FormatCurrency(totalPrice)}</div>
                            </div>

                            {/* Paypal Payment */}
                            {!isPaid && paymentMethod === "PayPal" && (
                                <div>
                                    <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                                        <PrintLoadingState />
                                        <PayPalButtons
                                            createOrder={handleCreatePayPalOrder}
                                            onApprove={handleApprovePayPalOrder}
                                        />
                                    </PayPalScriptProvider>
                                </div>
                            )}
                            {/* BudPay Button */}
                            {!isPaid && paymentMethod === "Budpay" && (
                                <div>
                                    <BudPayButtonComponent
                                        apiKey={budpayApiKey}
                                        amount={Number(totalPrice)}
                                        currency="NGN"
                                        reference={reference}
                                        customer={{
                                            email: order?.user?.email,
                                            first_name: order?.user?.name,
                                            last_name: '',
                                            phone: '',
                                        }}
                                        // callbackUrl={`/order/${order.id}`}
                                        onComplete={handlePaymentComplete}
                                        onCancel={handlePaymentCancel}
                                        text="Pay with BudPay"
                                        className="w-full py-2 px-4 bg-[#6C63FF] text-white rounded hover:bg-[#5a52cc] transition"
                                    />
                                </div>
                            )}

                            {/* cash On Delivery */}
                            {isAdmin && !isPaid && paymentMethod === 'Cash On Delivery' && (
                                <MarkasPaidButton />
                            )}
                            {isAdmin && isPaid && !isDelivered && (
                                <MarkasDeliveredButton />
                            )}

                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default OrderDetailsTable;
