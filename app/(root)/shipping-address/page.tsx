import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.action";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ShippingAddressForm from "./shipping-address-form";
import { shippingAddress } from "@/types";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
    title: "Shipping Address",
};
const ShippingAddress = async () => {
    const cart = await getMyCart();

    if (!cart || cart.items.length === 0) redirect("/cart");

    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("No User Id");

    const user = await getUserById(userId);
    return (
        <>
            <CheckoutSteps current={1} />
            <ShippingAddressForm address={user.address as shippingAddress} />
        </>
    );
};

export default ShippingAddress;
