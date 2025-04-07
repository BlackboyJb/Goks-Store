'use client'
import { useState } from "react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";



const DeleteDialogPage = ({ id, action }: { id: string; action: (id: string) => Promise<{ success: boolean; message: string; }> }) => {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const handleDeleteClick = () => {
        startTransition(async () => {
            const res = await action(id)
            if (!res.success) {
                toast.error(res.message);
            } else {
                setOpen(false)
                toast.success(res.message);
            }
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size='sm' variant='destructive' className="ml-2">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are your Sure?</AlertDialogTitle>
                    <AlertDialogDescription>This Action cannot be Reversed!!!</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button size='sm' variant='destructive' disabled={isPending} onClick={handleDeleteClick}>{isPending ? 'Deleting...' : 'Delete'}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteDialogPage;