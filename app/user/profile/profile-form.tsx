"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/actions/user.actions";
import { updateProfileSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ProfileFormPage = () => {
    const { data: session, update } = useSession();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    const form = useForm<z.infer<typeof updateProfileSchema>>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: session?.user?.name ?? "",
            email: session?.user?.email ?? "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
        const res = await updateProfile(values);
        if (res?.success) {
            toast.success(res.message);
            await update();
        } else {
            toast.error(res?.message || "Something went wrong");
        }
        const newSession = {
            ...session,
            user: {
                ...session?.user,
                ...(values.name && { name: values.name }),
                ...(values.email && { email: values.email }),
            },
        };

        await update(newSession);

    };
    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Label htmlFor="name">Name</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Name"
                                        className="input-field"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Label htmlFor="email">Email</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Email"
                                        className="input-field"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <h2 className="text-lg font-semibold">Change Password</h2>

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Label htmlFor="password">Password</Label>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Password"
                                            className="input-field"
                                            type={showPassword ? "text" : "password"}
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-3 flex items-center"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Confirm Password"
                                            className="input-field"
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleConfirmPasswordVisibility}
                                            className="absolute inset-y-0 right-3 flex items-center"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    size="lg"
                    className="button col-span-2 w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? "Submitting..." : "Update Profile"}
                </Button>
            </form>
        </Form>
    );
};

export default ProfileFormPage;
