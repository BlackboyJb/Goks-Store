"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { addToCartItem, removeItemFromCart } from "@/lib/actions/cart.action";
import { ArrowRight, Minus, Plus, Loader } from "lucide-react";
import { cart } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormatCurrency } from "@/lib/utils";

const CartTable = ({ Cart }: { Cart?: cart }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    return (
        <>
            <h1 className="py-2 h2-bold">Shopping Cart</h1>
            {!Cart || Cart.items.length === 0 ? (
                <div>
                    Cart is Empty. <Link href="/">Go Shopping</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead className="text-center">Quantity</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Cart.items.map((product) => (
                                    <TableRow key={product.slug}>
                                        <TableCell>
                                            <Link
                                                href={`/product/${product.slug}`}
                                                className="flex items-center"
                                            >
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    height={50}
                                                    width={50}
                                                />
                                                <span className="px-2">{product.name}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="flex-center gap-2">
                                            <Button
                                                disabled={isPending}
                                                variant="outline"
                                                type="button"
                                                onClick={() =>
                                                    startTransition(async () => {
                                                        const res = await removeItemFromCart(
                                                            product.productId
                                                        );
                                                        if (!res.success) {
                                                            toast.error(res.message);
                                                            return;
                                                        } else {
                                                            toast.success(res.message)
                                                            return;
                                                        }
                                                    })
                                                }
                                            >
                                                {isPending ? (
                                                    <Loader className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Minus className="w-4 h-4" />
                                                )}
                                            </Button>
                                            <span>{product.qty}</span>
                                            <Button
                                                disabled={isPending}
                                                variant="outline"
                                                type="button"
                                                onClick={() =>
                                                    startTransition(async () => {
                                                        const res = await addToCartItem(product);
                                                        if (!res.success) {
                                                            toast.error(res.message);
                                                            return;
                                                        } else {
                                                            toast.success(res.message);
                                                            return;
                                                        }
                                                    })
                                                }
                                            >
                                                {isPending ? (
                                                    <Loader className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Plus className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ₦{product.price}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Card>
                        <CardContent className="p-2 gap-4">
                            <div className="pb-3 text-xl">
                                Subtotal({Cart.items.reduce((a, c) => a + c.qty, 0)}):
                                <span className="font-bold">
                                    {FormatCurrency(Cart.itemsPrice)}
                                </span>
                            </div>
                            <Button
                                className="w-full"
                                disabled={isPending}
                                onClick={() =>
                                    startTransition(() => router.push("/shipping-address"))
                                }
                            >
                                {isPending ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowRight className="w-4 h-4" />
                                )}{" "}
                                Proceed to Checkout
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
};

export default CartTable;
