"use client";
import { cart, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { toast } from "sonner";
import { addToCartItem, removeItemFromCart } from "@/lib/actions/cart.action";
import { useTransition } from "react";

const AddtoCart = ({ cart, item }: { cart?: cart; item: CartItem }) => {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    //Function for Adding Item to Cart
    const handleAddtoCart = async () => {
        startTransition(async () => {
            const res = await addToCartItem(item);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            // Handle success add to cart
            toast.success(res.message, {
                action: {
                    label: "Go to Cart",
                    onClick: () => router.push("/cart"),
                },
            });
        });
    };

    //Function for Removing Item from Cart
    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);

            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };

    ///Check if Item is in Cart
    const existItem =
        cart && cart.items.find((x) => x.productId === item.productId);

    return existItem ? (
        <div>
            <Button
                className="button"
                variant="outline"
                onClick={handleRemoveFromCart}
            >
                {isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                ) : (
                    <Minus className="h-4 w-4" />
                )}
            </Button>
            <span className="px-2">{existItem.qty}</span>
            <Button className="button" variant="outline" onClick={handleAddtoCart}>
                {isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                ) : (
                    <Plus className="h-4 w-4" />
                )}
            </Button>
        </div>
    ) : (
        <Button className="w-full" type="button" onClick={handleAddtoCart}>
            {isPending ? (
                <Loader className="w-4 h-4 animate-spin" />
            ) : (
                <Plus className="h-4 w-4" />
            )}
        </Button>
    );
};

export default AddtoCart;
