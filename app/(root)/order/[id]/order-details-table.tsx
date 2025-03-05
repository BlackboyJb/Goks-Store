"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { FormatCurrency } from "@/lib/utils";

const OrderDetailsTable = ({ order }: { order: Order }) => {
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
                                                <Link href={`/product/${item.slug}`} className="flex items-center">
                                                    <Image src={item.image} alt={item.name} height={50} width={50} />
                                                    <span className="px-2">{item.name}</span>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-2">{item.qty}</span>
                                            </TableCell>
                                            <TableCell className="text-right">{FormatCurrency(item.price)}</TableCell>
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default OrderDetailsTable;
