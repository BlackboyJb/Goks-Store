'use server'
import { Resend } from 'resend'
import { APP_NAME, SENDER_EMAIL } from '@/lib/constants/index'
import { Order } from '@/types';
import PurchaseReceipt from './purchase-receipt'
import dotenv from 'dotenv';
dotenv.config()


const resend = new Resend();


export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
    await resend.emails.send({
        from: `${APP_NAME} <${SENDER_EMAIL}>`,
        to: order.user.email,
        subject: `Order confrimation ${order.id}`,
        react: <PurchaseReceipt order={order} />

    })
}






