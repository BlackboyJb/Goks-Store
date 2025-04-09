import { loadStripe } from '@stripe/stripe-js'
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useTheme } from 'next-themes';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormatCurrency } from './utils';
import { PUBLIC_DOMAIN } from './constants';

const StripePayments = ({ priceInCents, orderId, clientSecret }: { priceInCents: number; orderId: string; clientSecret: string }) => {
    const stripePromise = loadStripe('pk_test_51RBuS2CekJWR4zEKbQblQUquUof5GysdN3WxtZricJNfPMUhjRKkTUvmIONzbHpx4KOwI1gQyJVGI2sYe57oZJvT00VQ74opr7')

    const { theme, systemTheme } = useTheme()

    //Stripe form Component
    const StripeForm = () => {
        const stripe = useStripe()
        const elements = useElements()

        const [isloading, setLoading] = useState(false)
        const [errorMessage, setErrorMessage] = useState('')
        const [email, setEmail] = useState('')

        const handleSubmit = async (e: FormEvent) => {
            e.preventDefault()

            if (stripe == null || elements == null || email == null) return;

            setLoading(true);

            stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${PUBLIC_DOMAIN}/order/${orderId}/stripe-payment-success`
                }
            }).then(({ error }) => {
                if (error?.type === 'card_error' || error?.type === 'validation_error') {
                    setErrorMessage(error?.message ?? 'An Unknown Error occured')
                } else if (error) {
                    setErrorMessage('An Unknown Error occured')
                }
            }).finally(() => setLoading(false))
        }

        return (
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='text-xl'>Stripe Checkout:</div>
                {errorMessage && <div className='text-destructive'>{errorMessage}</div>}
                <PaymentElement />
                <div>
                    <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
                </div>
                <Button className='w-full' size='lg' disabled={stripe == null || elements == null || isloading}>
                    {isloading ? 'Purchasing' : `${FormatCurrency(priceInCents / 100)}`}
                </Button>
            </form>
        )

    }


    return (<Elements options={{
        clientSecret,
        appearance: {
            theme: theme === 'dark' ? 'night' : theme === 'light' ? 'stripe' : systemTheme === 'light' ? 'stripe' : 'night'
        }
    }} stripe={stripePromise}>
        <StripeForm />
    </Elements>);
}

export default StripePayments;