import { Metadata } from "next";
import { getMyCart } from "@/lib/actions/cart.action";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { shippingAddress } from "@/types";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { FormatCurrency } from "@/lib/utils";
import PlaceOrderForm from "./place-order-form";

export const metadata: Metadata = {
    title: "Place Order",
};

const PlaceOrderPage = async () => {
    const cart = await getMyCart();
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error("User not Found");

    const user = await getUserById(userId);

    if (!cart || cart.items.length === 0) redirect("/cart");
    if (!user.address) redirect("/shipping-address");
    if (!user.paymentMethod) redirect("/payment-method");

    const userAddress = user.address as shippingAddress;
    return (
        <>
            <CheckoutSteps current={3} />
            <h1 className="py-4 text-2xl">Place Order</h1>
            <div className="grid md:grid-cols-3 md:gap-5">
                <div className="md:col-span-2 overflow-x-auto space-y-4">
                    <Card>
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">Shipping Details</h2>
                            <p>Name: {userAddress.fullName}</p>
                            <p>
                                Street Address: {userAddress.streetAddress}, {userAddress.city},{" "}
                                {userAddress.country}, {userAddress.postalCode}.
                            </p>
                            <div className="mt-3">
                                <Link href="shipping-address">
                                    <Button variant="outline">Edit</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">Payment Method</h2>
                            <p>Payment Type: {user.paymentMethod}</p>
                            <div className="mt-3">
                                <Link href="payment-method">
                                    <Button variant="outline">Edit</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">Order Item</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead className="text-center">Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart.items.map((item) => (
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
                                <div>{FormatCurrency(cart.itemsPrice)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Shipping Price :</div>
                                <div>{FormatCurrency(cart.shippingPrice)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Total Price :</div>
                                <div>{FormatCurrency(cart.totalPrice)}</div>
                            </div>
                            <PlaceOrderForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderPage;
