import { Metadata } from "next";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import PaymentMethodFormPage from "./PaymentMethodForm";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
    title: "Payment Method Page",
};
const PaymentMethodPage = async () => {
    const session = await auth();
    const userId = session?.user?.id

    if (!userId) throw new Error('User Not Found')

    const user = await getUserById(userId)
    return <>
        <CheckoutSteps current={2} />
        <PaymentMethodFormPage preferredPaymentMethod={user.paymentMethod} />
    </>;
};

export default PaymentMethodPage;
