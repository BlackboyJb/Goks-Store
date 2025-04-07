import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.action";
import { notFound } from "next/navigation";
import { shippingAddress } from "@/types";
import OrderDetailsTable from "./order-details-table";
import { auth } from "@/auth";

export const metadata: Metadata = {
    title: "Order Details",
};

const OrderDetailsPage = async (props: {
    params: Promise<{
        id: string;
    }>;
}) => {
    const { id } = await props.params;

    const order = await getOrderById(id);

    if (!order) notFound();

    const session = await auth()
    return (
        <OrderDetailsTable
            order={{
                ...order,
                shippingAddress: order.shippingAddress as shippingAddress,
            }}
            paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
            budpayApiKey={process.env.BUDPAY_PUBLIC_KEY || ''}
            isAdmin={session?.user?.role === 'admin' || false}
        />
    );
};

export default OrderDetailsPage;
