'use client'
import { z } from "zod";
import { AdminUserUpdate } from "@/lib/validators";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { USER_ROLES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { AdminUpdateUser } from "@/lib/actions/user.actions";


const UpdateUserForm = ({ user }: { user: z.infer<typeof AdminUserUpdate> }) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof AdminUserUpdate>>({
        resolver: zodResolver(AdminUserUpdate),
        defaultValues: user
    })
    const onSubmit = async (values: z.infer<typeof AdminUserUpdate>) => {
        try {
            const res = await AdminUpdateUser({
                ...values,
                id: user.id
            })

            if (!res.success) {
                toast.error(res.message);
            }

            if (res.success) {
                toast.success(res.message);
            }
            form.reset()
            router.push('/admin/users')
        } catch (error) {
            toast((error as Error).message);
        }
    }
    return <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
                {/* email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({
                        field,
                    }: {
                        field: ControllerRenderProps<
                            z.infer<typeof AdminUserUpdate>,
                            "email"
                        >;
                    }) => (
                        <FormItem className="w-full">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={true} placeholder="Enter User Email" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <div>
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({
                        field,
                    }: {
                        field: ControllerRenderProps<
                            z.infer<typeof AdminUserUpdate>,
                            "name"
                        >;
                    }) => (
                        <FormItem className="w-full">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter User Name" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <div>
                {/* Name */}
                <FormField
                    control={form.control}
                    name='role'
                    render={({
                        field,
                    }: {
                        field: ControllerRenderProps<
                            z.infer<typeof AdminUserUpdate>,
                            'role'
                        >;
                    }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Role</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value.toString()}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select a role' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {USER_ROLES.map((role) => (
                                        <SelectItem key={role} value={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex-between mt-4">
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Submitting...' : 'Update User'}
                </Button>
            </div>
        </form>
    </Form>;
}

export default UpdateUserForm;