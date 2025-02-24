'use client'
import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addToCartItem } from "@/lib/actions/cart.action";


const AddtoCart = ({ item }: { item: CartItem }) => {
    const router = useRouter()



    const handleAddtoCart = async () => {
        const res = await addToCartItem(item)

        if (!res.success) {
            toast.error(res.message)
            return;
        }

        //Handle Success add to cart
        // Handle success add to cart
        toast.success(`${item.name} added to cart`, {
            action: {
                label: "Go to Cart",
                onClick: () => router.push('/cart'),
            },
        });

    }



    return (<Button className="w-full" type="button" onClick={handleAddtoCart}><Plus /> Add to Cart</Button>);
}

export default AddtoCart;