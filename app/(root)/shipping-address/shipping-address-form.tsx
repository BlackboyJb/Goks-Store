"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition, useState, useEffect } from "react";
import { ShippingAddressSchema } from "@/lib/validators";
import { shippingAddress } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserAddress } from "@/lib/actions/user.actions";
import Select from "react-select";
import { State } from "country-state-city";

// Helper: Ensure form values are never undefined
const normalizeAddress = (address: shippingAddress) => ({
    fullName: address?.fullName ?? "",
    streetAddress: address?.streetAddress ?? "",
    country: address?.country ?? "Nigeria",
    city: address?.city ?? "",
    postalCode: address?.postalCode ?? "",
});

const ShippingAddressForm = ({ address }: { address: shippingAddress }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof ShippingAddressSchema>>({
        resolver: zodResolver(ShippingAddressSchema),
        defaultValues: normalizeAddress(address),
    });

    const [isPending, startTransition] = useTransition();
    const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Ensure hydration consistency
        setMounted(true);

        // Fetch Nigerian cities safely
        const nigeriaCities = State.getStatesOfCountry("NG") ?? [];
        setCities(
            nigeriaCities.map((state) => ({ label: state.name, value: state.name }))
        );
    }, []);

    const onSubmit: SubmitHandler<z.infer<typeof ShippingAddressSchema>> = async (values) => {
        startTransition(async () => {
            const res = await updateUserAddress(values);
            if (!res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }

            router.push('/payment-method')
        });

    };

    return (
        <div className="max-w-md mx-auto space-y-4">
            <h1 className="h2-bold mt-4">Shipping Address</h1>
            <p className="text-sm text-muted-foreground">
                Please enter your shipping address
            </p>

            <Form {...form}>
                <form
                    method="post"
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {/* Full Name */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof ShippingAddressSchema>,
                                "fullName"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Full Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Street Address */}
                    <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof ShippingAddressSchema>,
                                "streetAddress"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Country */}
                    <FormField
                        control={form.control}
                        name="country"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof ShippingAddressSchema>,
                                "country"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input placeholder="Select Country" {...field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* City */}
                    <FormField
                        control={form.control}
                        name="city"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof ShippingAddressSchema>,
                                "city"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    {mounted ? (
                                        <Select
                                            options={cities}
                                            placeholder="Select City"
                                            onChange={(selected) =>
                                                field.onChange(selected?.value || "")
                                            }
                                            value={
                                                cities.find((city) => city.value === field.value) ||
                                                null
                                            }
                                            isClearable
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    backgroundColor: "#ffffff", // White background
                                                    color: "#000000", // Black text
                                                    borderColor: "#cccccc", // Light gray border
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: "#ffffff", // White dropdown background
                                                    color: "#000000", // Black text in dropdown
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    color: "#000000", // Ensure selected value is black
                                                }),
                                                placeholder: (base) => ({
                                                    ...base,
                                                    color: "#000000", // Placeholder text color
                                                }),
                                                option: (base, { isFocused }) => ({
                                                    ...base,
                                                    backgroundColor: isFocused ? "#f0f0f0" : "#ffffff", // Light gray on hover
                                                    color: "#000000", // Ensure dropdown options are black
                                                }),
                                            }}
                                        />
                                    ) : (
                                        <div className="h-10 w-full bg-gray-200 animate-pulse rounded-lg" />
                                    )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Postal Code */}
                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof ShippingAddressSchema>,
                                "postalCode"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Postal Code" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <div className="flex gap-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                                <ArrowRight className="w-4 h-4" />
                            )}
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ShippingAddressForm;
