import { Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBoxes = () => {
    return (
        <div className="px-4">
            <Card className="w-full max-w-7xl mx-auto">
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border p-6 text-center">
                    <div className="space-y-2 px-6 py-4 flex flex-col items-center">
                        <ShoppingBag className="w-6 h-6" />
                        <div className="text-sm font-bold">Free Shipping</div>
                        <div className="text-sm text-muted-foreground text-center">
                            Free Shipping for Orders above ₦100,000
                        </div>
                    </div>
                    <div className="space-y-2 px-6 py-4 flex flex-col items-center">
                        <WalletCards className="w-6 h-6" />
                        <div className="text-sm font-bold">Flexible Payments</div>
                        <div className="text-sm text-muted-foreground text-center">
                            Paypal, Stripe, BudPay, Cash on Delivery
                        </div>
                    </div>
                    <div className="space-y-2 px-6 py-4 flex flex-col items-center">
                        <Headset className="w-6 h-6" />
                        <div className="text-sm font-bold">Customer Service</div>
                        <div className="text-sm text-muted-foreground text-center">
                            Support Available
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default IconBoxes;
