// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { updateOrdertoPaid } from "@/lib/actions/order.action";

// export async function POST(req: NextRequest) {
//   //Build the webhook
//   const event = await Stripe.webhooks.constructEvent(
//     await req.text(),
//     req.headers.get("stripe-signature") as string,
//     process.env.STRIPE_WEBHOOK_SECRET as string
//   );

//   //check for successful payment
//   if (event.type === "charge.succeeded") {
//     const { object } = event.data;

//     //update Order status
//     await updateOrdertoPaid({
//       orderId: object.metadata.orderId,
//       paymentResult: {
//         id: object.id,
//         status: "COMPLETED",
//         email_address: object.billing_details.email!,
//         PricePaid: (object.amount / 100).toFixed(),
//       },
//     });

//     return NextResponse.json({
//       message: "Update Order to Paid was Successful",
//     });
//   }

//   return NextResponse.json({
//     message: "event was not charge.succeeded",
//   });
// }

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { updateOrdertoPaid } from "@/lib/actions/order.action";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "charge.succeeded") {
      const { object } = event.data;

      await updateOrdertoPaid({
        orderId: object.metadata.orderId,
        paymentResult: {
          id: object.id,
          status: "COMPLETED",
          email_address: object.billing_details.email!,
          PricePaid: (object.amount / 100).toFixed(),
        },
      });

      return res.status(200).json({
        message: "Update Order to Paid was Successful",
      });
    }

    return res.status(200).json({
      message: "event was not charge.succeeded",
    });
  }

  res.setHeader("Allow", "POST");
  res.status(405).end("Method Not Allowed");
}
