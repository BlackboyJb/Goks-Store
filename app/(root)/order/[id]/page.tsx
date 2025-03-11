import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.action";
import { notFound } from "next/navigation";
import { shippingAddress } from "@/types";
import OrderDetailsTable from "./order-details-table";

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
    return (
        <OrderDetailsTable
            order={{
                ...order,
                shippingAddress: order.shippingAddress as shippingAddress,
            }}
            paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
        />
    );
};

export default OrderDetailsPage;
