import { Button } from "@/components/ui/button";
import { getOrderById } from "@/lib/actions/order.action";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const SuccessPage = async (props: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ payment_intent: string }>
}) => {

    const { id } = await props.params;
    const { payment_intent: paymentIntentId } = await props.searchParams;

    //fetch Order
    const order = await getOrderById(id);
    if (!order) notFound()

    //Retrieve Payment Intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    //check if Payment Intent is Valid
    if (paymentIntent.metadata.orderId == null || paymentIntent.metadata.orderId !== order.id.toString()) {
        return notFound()
    }


    //check if payment is successful
    const isSuccess = paymentIntent.status === 'succeeded'

    if (!isSuccess) return redirect(`/order/${id}`)

    return (<div className="max-w-4xl w-full mx-auto space-y-8">
        <div className="flex flex-col gap-6 items-center">
            <h1 className="h1-bold">Thanks for your Purchase</h1>
            <div>We are processing your order.</div>
            <Button asChild>
                <Link href={`/order/${id}`}>View order</Link>
            </Button>
        </div>
    </div>);
}

export default SuccessPage;