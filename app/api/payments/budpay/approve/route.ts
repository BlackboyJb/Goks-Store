// app/api/payments/budpay/approve/route.ts

import { approveBudPayOrder } from "@/lib/actions/order.action"; // adjust this path

export async function POST(req: Request) {
  try {
    const { orderId, transactionId } = await req.json();

    const updatedOrder = await approveBudPayOrder(orderId, transactionId);

    return Response.json({ success: true, data: updatedOrder });
  } catch (error) {
    return Response.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
