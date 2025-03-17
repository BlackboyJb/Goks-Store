import { requireAdmin } from "@/lib/auth-guard";
import { auth } from "@/auth";
import { deleteOrder, getAllOrders } from "@/lib/actions/order.action";
import { Metadata } from "next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import PaginationPage from "@/components/shared/pagination";
import { FormatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DeleteDialogPage from "@/components/shared/delete-dialog";

export const metadata: Metadata = {
    title: 'Admin Orders'
}

const AdminOrders = async (props: {
    searchParams: Promise<{ page: string }>
}) => {
    await requireAdmin()
    const { page = '1' } = await props.searchParams

    const session = await auth()

    if (session?.user?.role !== 'admin') {
        throw new Error('User is not Authorized')
    }

    const orders = await getAllOrders({
        page: Number(page),

    })


    return (<div className="space-y-2">
        <h2 className="h2-bold">Your Orders</h2>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>DATE</TableHead>
                        <TableHead>TOTAL PRICE</TableHead>
                        <TableHead>PAID</TableHead>
                        <TableHead>DELIVERED</TableHead>
                        <TableHead>ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.data.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{formatId(order.id)}</TableCell>
                            <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                            <TableCell>{FormatCurrency(order.totalPrice)}</TableCell>
                            <TableCell>{order.isPaid && order.paidAt ? (formatDateTime(order.paidAt).dateTime) : ('Not Paid')}</TableCell>
                            <TableCell>{order.isDelivered && order.deliveredAt ? (formatDateTime(order.deliveredAt).dateTime) : ('Not Delivered')}</TableCell>
                            <TableCell>
                                <Button asChild variant='outline' size='sm'><Link href={`/order/${order.id}`}>Details</Link></Button>
                                <DeleteDialogPage id={order.id} action={deleteOrder} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {orders.totalPages > 1 && (
                <PaginationPage page={Number(page) || 1} totalPages={orders?.totalPages} />
            )}
        </div>
    </div>
    );
}

export default AdminOrders;