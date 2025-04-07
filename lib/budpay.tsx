// components/BudPayButtonComponent.tsx

"use client";

import React from "react";
import { useBudPayPayment } from "@budpay/react";

type BudPayButtonProps = {
    apiKey: string;
    amount: number;
    currency?: string;
    reference: string;
    customer: {
        email: string;
        first_name: string;
        last_name: string;
        phone: string;
    };
    callbackUrl?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onComplete?: (data: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCancel?: (data: any) => void;
    className?: string;
    text?: string;
};

const BudPayButtonComponent: React.FC<BudPayButtonProps> = ({
    apiKey,
    amount,
    currency = "NGN",
    reference,
    customer,
    callbackUrl,
    onComplete,
    onCancel,
    className,
    text = "Pay with BudPay",
}) => {
    const initiateBudPayPayment = useBudPayPayment({
        api_key: apiKey,
        amount,
        currency,
        reference,
        customer,
        callback_url: callbackUrl,
        onComplete,
        onCancel,
        custom_fields: { source: "react-ecommerce" },
        debug: true,
    });

    return (
        <button
            className={className ?? "px-4 py-2 rounded bg-primary text-white"}
            onClick={initiateBudPayPayment}
        >
            {text}
        </button>
    );
};

export default BudPayButtonComponent;


