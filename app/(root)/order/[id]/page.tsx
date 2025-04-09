import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.action";
import { notFound } from "next/navigation";
import { shippingAddress } from "@/types";
import OrderDetailsTable from "./order-details-table";
import { auth } from "@/auth";
import Stripe from 'stripe'
import { getExchangeRate } from "@/lib/paypal";

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

    const exchangeRate = await getExchangeRate()

    const priceInNaira = Number(order.totalPrice)

    const priceInUSD = (priceInNaira / exchangeRate).toFixed(2); // Round to 2 decimal places

    let client_sercret = null



    //check if its not paid and using Stripe
    if (order.paymentMethod === 'Stripe' && !order.isPaid) {
        //initilize stripe instance
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
        //create payments intent
        const paymentIntents = await stripe.paymentIntents.create({
            amount: Math.round(Number(priceInUSD) * 100),
            currency: 'USD',
            metadata: { orderId: order.id }
        });
        client_sercret = paymentIntents.client_secret
    }
    return (
        <OrderDetailsTable
            order={{
                ...order,
                shippingAddress: order.shippingAddress as shippingAddress,
            }}
            stripeClientSecret={client_sercret}
            paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
            budpayApiKey={process.env.BUDPAY_PUBLIC_KEY || ''}
            isAdmin={session?.user?.role === 'admin' || false}
        />
    );
};

export default OrderDetailsPage;
