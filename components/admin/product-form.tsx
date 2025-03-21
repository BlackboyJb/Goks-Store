"use client";

import { productDefaultValues } from "@/lib/constants";
import { insertProductSchemas, updateProductSchema } from "@/lib/validators";
import { product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import slugify from "slugify";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { UploadButton } from "@/lib/uploadthing";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";


const ProductForm = ({
    type,
    product,
    productId,
}: {
    type: "Create" | "Update";
    product?: product;
    productId?: string;
}) => {
    const router = useRouter();
    type InsertProductSchema = z.infer<typeof insertProductSchemas>;
    type UpdateProductSchema = z.infer<typeof updateProductSchema>;

    const form = useForm<InsertProductSchema | UpdateProductSchema>({
        resolver: zodResolver(
            type === "Update" ? updateProductSchema : insertProductSchemas
        ),
        defaultValues:
            product && type === "Update" ? product : productDefaultValues,
    });

    const onSubmit: SubmitHandler<z.infer<typeof insertProductSchemas>> = async (values) => {
        ///create
        if (type === 'Create') {
            const res = await createProduct(values)

            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
            router.push('/admin/products')

        }

        //update
        if (type === 'Update') {
            if (!productId) {
                router.push('/admin/products')
                return
            }
            const res = await updateProduct({ ...values, id: productId })

            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
            router.push('/admin/products')


        }
    }

    const images = form.watch('images')
    const isFeatured = form.watch('isFeatured')
    const banner = form.watch('banner')
    return (
        <Form {...form}>
            <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-5">
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchemas>,
                                "name"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Product Name" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* slug */}
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchemas>,
                                "slug"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="Enter Product Slug" {...field} />
                                        <Button type="button" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2" onClick={() => {
                                            form.setValue('slug', slugify(form.getValues('name'), { lower: true }))
                                        }}>Generate</Button>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    {/* category */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchemas>,
                                "category"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Adventure">Adventure</SelectItem>
                                            <SelectItem value="Console">Console</SelectItem>
                                            <SelectItem value="Football">Football</SelectItem>
                                            <SelectItem value="Millitary">Millitary</SelectItem>
                                            <SelectItem value="Arcade">Arcade</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* brand */}
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchemas>,
                                "brand"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Brand</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Product Brand" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/*console_type*/}
                    <FormField
                        control={form.control}
                        name="console_type"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchemas>,
                                "console_type"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Console Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Product Console Type" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    {/* price */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchemas>,
                                "price"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Product Price" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* stock*/}
                    <FormField
                        control={form.control}
                        name="stock"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchemas>,
                                "stock"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Product Stock" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="upload-field flex flex-col md:flex-row gap-5">
                    {/* images */}
                    <FormField
                        control={form.control}
                        name="images"
                        render={() => (
                            <FormItem className="w-full">
                                <FormLabel>Images</FormLabel>
                                <Card>
                                    <CardContent className="space-y-2 mt-2 min-h-48">
                                        <div className="flex-start space-x-2">
                                            {images.map((image: string) => (
                                                <Image key={image} src={image} alt="product Image" className="w-20 h-20 object-cover object-center rounded-sm " width={100} height={100} />
                                            ))}
                                            <FormControl>
                                                <UploadButton endpoint='imageUploader' onClientUploadComplete={(res: { url: string }[]) => {
                                                    form.setValue('images', [...images, res[0].url])
                                                }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error(error.message)
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </CardContent>
                                </Card>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="upload-field">
                    {/* isFeatured */}
                    Featured Product
                    <Card>
                        <CardContent className="space-y-2 mt-2">
                            <FormField control={form.control} name='isFeatured' render={({ field }) => (
                                <FormItem className="space-x-2 items-center">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel>Is Featured?</FormLabel>
                                </FormItem>
                            )} />
                            {isFeatured && banner && (
                                <Image src={banner} alt='banner image' className="w-full object-cover object-center rounded-sm" width={1920} height={680} />
                            )}
                            {isFeatured && !banner && (
                                <UploadButton endpoint='imageUploader' onClientUploadComplete={(res: { url: string }[]) => {
                                    form.setValue('banner', res[0].url)
                                }}
                                    onUploadError={(error: Error) => {
                                        toast.error(error.message)
                                    }}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div>{/* description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchemas>,
                                "description"
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter Product Description" className="resize-none"{...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div>{/* submit */}
                    <Button type="submit" size='lg' disabled={form.formState.isSubmitting} className="button col-span-2 w-full">{form.formState.isSubmitting ? 'Submitting' : `${type} product`}</Button>
                </div>
            </form>
        </Form>
    );
};

export default ProductForm;
