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
    searchParams: Promise<{ page: string; query: string; }>
}) => {
    await requireAdmin()
    const { page = '1', query: searchText } = await props.searchParams

    const session = await auth()

    if (session?.user?.role !== 'admin') {
        throw new Error('User is not Authorized')
    }

    const orders = await getAllOrders({
        page: Number(page),
        query: searchText

    })


    return (
        <div className="space-y-2">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <h1 className="h2-bold">Orders</h1>
                    {searchText && (
                        <div>
                            filtered by <i>&quot;{searchText}&quot;</i>{' '}
                            <Link href='/admin/orders'>
                                <Button variant='outline' size='sm'>Remove Filter</Button>
                            </Link>
                        </div>
                    )}
                </div>
                <Button asChild variant="default">
                    <Link href="/admin/products/create">Create Product</Link>
                </Button>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>DATE</TableHead>
                            <TableHead>BUYER</TableHead>
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
                                <TableCell>{order.user.name}</TableCell>
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