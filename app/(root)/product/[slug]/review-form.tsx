"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem
} from "@/components/ui/select";
import { reviewFormDefaultValues } from "@/lib/constants";
import { insertReviewSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";

import { StarIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createUpdateReview, getReviewByProductId } from "@/lib/actions/review.actions";

import { Textarea } from "@/components/ui/textarea";


// export default ReviewForm;
const ReviewForm = ({
    userId,
    productId,
    onReviewSubmitted,
}: {
    userId: string;
    productId: string;
    onReviewSubmitted: () => void;
}) => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof insertReviewSchema>>({
        resolver: zodResolver(insertReviewSchema),
        defaultValues: reviewFormDefaultValues,
    });

    //submit form Handler
    const handleOpenForm = async () => {
        form.setValue('productId', productId)
        form.setValue('userId', userId)

        const review = await getReviewByProductId({ productId })

        if (review) {
            form.setValue('title', review.title)
            form.setValue('description', review.description)
            form.setValue('rating', review.rating)
        }


        setOpen(true);
    }

    //submit form handler
    const onSubmit: SubmitHandler<z.infer<typeof insertReviewSchema>> = async (values) => {
        const res = await createUpdateReview({ ...values, productId });
        if (!res.success) {
            toast.error(res.message);
        }
        setOpen(false);
        onReviewSubmitted();
        toast.success(res.message);
    };

    return (<Dialog open={open} onOpenChange={setOpen}>
        <Button onClick={handleOpenForm} variant='default'>
            Write a Review
        </Button>
        <DialogContent className='sm:max-w-[425px]'>
            <Form {...form}>
                <form method='post' onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                        <DialogDescription>
                            Share your thoughts with other customers
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter title' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Enter description' {...field} />
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name='rating'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Rating</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={(index + 1).toString()}
                                                    >
                                                        {index + 1}{' '}
                                                        <StarIcon className='inline h-4 w-4' />
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type='submit'
                            size='lg'
                            className='w-full'
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
    );
};

export default ReviewForm;






























// const ReviewForm = ({
//     userId,
//     productId,
//     onReviewSubmitted,
// }: {
//     userId: string;
//     productId: string;
//     onReviewSubmitted?: () => void;
// }) => {
//     const [open, setOpen] = useState(false);
//     const form = useForm<z.infer<typeof insertReviewSchema>>({
//         resolver: zodResolver(insertReviewSchema),
//         defaultValues: reviewFormDefaultValues,
//     });

//     ///Open Form Handler
//     const handleOpenForm = () => {
//         return setOpen(true);
//     };

//     //submit form handler
//     const onSubmit: SubmitHandler<z.infer<typeof insertReviewSchema>> = async (values) => {
//         const res = await CreateUpdateReview({ ...values, productId })

//         if (!res.success) {
//             toast.error(res.message);
//             return;
//         }
//     }

// }
// return (
//     <Dialog open={open} onOpenChange={setOpen}>
//         <Button onClick={handleOpenForm} variant="default">
//             Write a Review
//         </Button>
//         <DialogContent className="sm:max-w-[425px]">
//             <Form {...form}>
//                 <form method="post" onSubmit={form.handleSaubmit(onsubmit)}>
//                     <DialogHeader>
//                         <DialogTitle>Write a Review</DialogTitle>
//                         <DialogDescription>
//                             Tell other customers what you feel about the product
//                         </DialogDescription>
//                     </DialogHeader>
//                     <div className="grid gap-4 py-4">
//                         <FormField
//                             control={form.control}
//                             name="title"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Tilte</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Enter Title" {...field} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="description"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Description</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Enter Descrtiption" {...field} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="rating"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Rating</FormLabel>
//                                     <Select
//                                         onValueChange={field.onChange}
//                                         value={field.value.toString()}
//                                     >
//                                         <FormControl>
//                                             <SelectTrigger>
//                                                 <SelectValue />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             {Array.from({ length: 5 }).map((_, index) => (
//                                                 <SelectItem
//                                                     key={index}
//                                                     value={(index + 1).toString()}
//                                                 >
//                                                     {index + 1} <StarIcon className="inline h-4 w-4" />
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     <DialogFooter>
//                         <Button
//                             type="submit"
//                             size="lg"
//                             className="w-full"
//                             disabled={form.formState.isSubmitting}
//                         >
//                             {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
//                         </Button>
//                     </DialogFooter>
//                 </form>
//             </Form>
//         </DialogContent>
//     </Dialog>
// );
// };
