// "use client";

// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useTransition } from "react";
// import { ShippingAddressSchema } from "@/lib/validators";
// import { shippingAddress } from "@/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ControllerRenderProps, useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Loader } from "lucide-react";

// const ShippingAddressForm = ({ address }: { address: shippingAddress }) => {
//     const router = useRouter();

//     const form = useForm<z.infer<typeof ShippingAddressSchema>>({
//         resolver: zodResolver(ShippingAddressSchema),
//         defaultValues: address,
//     });

//     const [isPending, startTransition] = useTransition();

//     const onSubmit = (values) => {
//         console.log(values)
//         return;
//     };

//     return (
//         <>
//             <div className="max-w-md mx-auto space-y-4">
//                 <h1 className="h2-bold mt-4">Shipping Address</h1>
//                 <p className="text-sm text-muted-foreground">
//                     Please Enter your Shipping Address
//                 </p>
//                 <Form {...form}>
//                     <form
//                         method="post"
//                         className="space-y-4"
//                         onSubmit={form.handleSubmit(onSubmit)}
//                     >
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <FormField
//                                 control={form.control}
//                                 name="fullName"
//                                 render={({
//                                     field,
//                                 }: {
//                                     field: ControllerRenderProps<
//                                         z.infer<typeof ShippingAddressSchema>,
//                                         "fullName"
//                                     >;
//                                 }) => (
//                                     <FormItem className="w-full">
//                                         <FormLabel>Full Name</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Enter Full Name" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <FormField
//                                 control={form.control}
//                                 name="streetAddress"
//                                 render={({
//                                     field,
//                                 }: {
//                                     field: ControllerRenderProps<
//                                         z.infer<typeof ShippingAddressSchema>,
//                                         "streetAddress"
//                                     >;
//                                 }) => (
//                                     <FormItem className="w-full">
//                                         <FormLabel>Street Address</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Enter Address" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <FormField
//                                 control={form.control}
//                                 name="country"
//                                 render={({
//                                     field,
//                                 }: {
//                                     field: ControllerRenderProps<
//                                         z.infer<typeof ShippingAddressSchema>,
//                                         "country"
//                                     >;
//                                 }) => (
//                                     <FormItem className="w-full">
//                                         <FormLabel>Country</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Select Country" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <FormField
//                                 control={form.control}
//                                 name="city"
//                                 render={({
//                                     field,
//                                 }: {
//                                     field: ControllerRenderProps<
//                                         z.infer<typeof ShippingAddressSchema>,
//                                         "city"
//                                     >;
//                                 }) => (
//                                     <FormItem className="w-full">
//                                         <FormLabel>State</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Select State" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <FormField
//                                 control={form.control}
//                                 name="postalCode"
//                                 render={({
//                                     field,
//                                 }: {
//                                     field: ControllerRenderProps<
//                                         z.infer<typeof ShippingAddressSchema>,
//                                         "postalCode"
//                                     >;
//                                 }) => (
//                                     <FormItem className="w-full">
//                                         <FormLabel>Postal Code</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Select Postal Code" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <div className="flex gap-2">
//                             <Button type="submit" disabled={isPending}>
//                                 {isPending ? (
//                                     <Loader className="w-4 h-4 animate-spin" />
//                                 ) : (
//                                     <ArrowRight className="w-4 h-4" />
//                                 )}{" "}
//                                 continue
//                             </Button>
//                         </div>
//                     </form>
//                 </Form>
//             </div>
//         </>
//     );
// };

// export default ShippingAddressForm;

"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition, useState, useEffect } from "react";
import { ShippingAddressSchema } from "@/lib/validators";
import { shippingAddress } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
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
import Select from "react-select";
import { State } from "country-state-city";

const ShippingAddressForm = ({ address }: { address: shippingAddress }) => {
    const router = useRouter();


    const form = useForm<z.infer<typeof ShippingAddressSchema>>({
        resolver: zodResolver(ShippingAddressSchema),
        defaultValues: { ...address, country: "Nigeria" },
    });

    const [isPending, startTransition] = useTransition();
    const [cities, setCities] = useState<{ label: string; value: string }[]>([]);


    useEffect(() => {
        // Fetch Nigerian cities and handle undefined safely
        const nigeriaCities = State.getStatesOfCountry("NG") ?? [];
        setCities(nigeriaCities.map((state) => ({ label: state.name, value: state.name })));
    }, []);



    const onSubmit = (values: z.infer<typeof ShippingAddressSchema>) => {
        console.log(values);
        return;
    };




    return (
        <>
            <div className="max-w-md mx-auto space-y-4">
                <h1 className="h2-bold mt-4">Shipping Address</h1>
                <p className="text-sm text-muted-foreground">
                    Please Enter your Shipping Address
                </p>
                <Form {...form}>
                    <form
                        method="post"
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, "fullName"> }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Full Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="streetAddress"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, "streetAddress"> }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Street Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, "country"> }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Select Country" {...field} disabled />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, "city"> }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Select
                                                options={cities}
                                                placeholder="Select City"
                                                onChange={(selected) => field.onChange(selected?.value)}
                                                value={cities.find((city) => city.value === field.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof ShippingAddressSchema>, "postalCode"> }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Postal Code" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowRight className="w-4 h-4" />
                                )} Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default ShippingAddressForm;















