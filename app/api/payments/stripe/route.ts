import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrdertoPaid } from "@/lib/actions/order.action";

export async function POST(req: NextRequest) {
  //Build the webhook
  const event = await Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  //check for successful payment
  if (event.type === "charge.succeed") {
    const { object } = event.data;

    //update Order status
    await updateOrdertoPaid({
      orderId: object.metadata.orderId,
      paymentResult: {
        id: object.id,
        status: "COMPLETED",
        email_address: object.billing_details.email!,
        PricePaid: (object.amount / 100).toFixed(),
      },
    });

    return NextResponse.json({
      message: "Update Order to Paid was Successful",
    });
  }

  return NextResponse.json({
    message: "event was not charge.succeeded",
  });
}
