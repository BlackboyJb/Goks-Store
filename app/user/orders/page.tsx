import { Metadata } from "next";
import { getMyOrders } from "@/lib/actions/order.action";
import { FormatCurrency, formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import PaginationPage from "@/components/shared/pagination";


export const metadata: Metadata = {
    title: 'My Orders',
}


const OrdersPage = async (props: {
    searchParams: Promise<{ page: string }>
}) => {

    const { page } = await props.searchParams

    const order = await getMyOrders({
        page: Number(page) || 1
    })


    return <div className="space-y-2">
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
                    {order.data.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{formatId(order.id)}</TableCell>
                            <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                            <TableCell>{FormatCurrency(order.totalPrice)}</TableCell>
                            <TableCell>{order.isPaid && order.paidAt ? (formatDateTime(order.paidAt).dateTime) : ('Not Paid')}</TableCell>
                            <TableCell>{order.isDelivered && order.deliveredAt ? (formatDateTime(order.deliveredAt).dateTime) : ('Not Delivered')}</TableCell>
                            <TableCell><Link href={`/order/${order.id}`}><span className="px-2">Details</span></Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {order.totalPages > 1 && (
                <PaginationPage page={Number(page) || 1} totalPages={order?.totalPages} />
            )}
        </div>
    </div>;
}

export default OrdersPage;