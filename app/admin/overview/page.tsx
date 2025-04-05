// import { Metadata } from "next";
// import { auth } from "@/auth";
// import { getOrderSummary } from "@/lib/actions/order.action";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { FormatCurrency, formatDateTime, FormatNumber } from "@/lib/utils";
// import { Barcode, CreditCard, Users } from "lucide-react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import Link from "next/link";
// import Charts from "./chart";
// import { requireAdmin } from "@/lib/auth-guard";

// export const metadata: Metadata = {
//     title: "Admin Overview",
// };

// const OverViewPage = async () => {
//     await requireAdmin()

//     const session = await auth();
//     const summary = await getOrderSummary();

//     if (session?.user?.role !== "admin") {
//         throw new Error("Authorization Declined");
//     }

//     return (
//         <div className="space-y-2">
//             <h1 className="h2-bold">Dashboard Overview</h1>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//                         ₦
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">
//                             {FormatCurrency(
//                                 summary.totalSales._sum.totalPrice?.toString() || 0
//                             )}
//                         </div>
//                     </CardContent>
//                 </Card>
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Sales</CardTitle>
//                         <CreditCard />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">
//                             {FormatNumber(summary.ordersCount)}
//                         </div>
//                     </CardContent>
//                 </Card>
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Users</CardTitle>
//                         <Users />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">
//                             {FormatNumber(summary.usersCount)}
//                         </div>
//                     </CardContent>
//                 </Card>
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Product</CardTitle>
//                         <Barcode />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">
//                             {FormatNumber(summary.productsCount)}
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//                 <Card className="col-span-4">
//                     <CardHeader>
//                         <CardTitle>Overview</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Charts data={{
//                             salesData: summary.salesData
//                         }} />
//                     </CardContent>
//                 </Card>
//                 <Card className="col-span-3">
//                     <CardHeader>
//                         <CardTitle>Recent Sales</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>BUYER</TableHead>
//                                     <TableHead>DATE</TableHead>
//                                     <TableHead>TOTAL</TableHead>
//                                     <TableHead>ACTIONS</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {summary.latestSales.map((item) => (
//                                     <TableRow key={item.id}>
//                                         <TableCell>
//                                             {item?.user?.name ? item.user.name : "Deleted User"}
//                                         </TableCell>
//                                         <TableCell>
//                                             {formatDateTime(item.createdAt).dateOnly}
//                                         </TableCell>
//                                         <TableCell>{FormatCurrency(item.totalPrice)}</TableCell>
//                                         <TableCell>
//                                             <Link href={`/order/${item.id}`}>
//                                                 <span className="px-2">Details</span>
//                                             </Link>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default OverViewPage;

import { Metadata } from "next";
import { auth } from "@/auth";
import { getOrderSummary } from "@/lib/actions/order.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormatCurrency, formatDateTime, FormatNumber } from "@/lib/utils";
import { Barcode, CreditCard, Users } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Charts from "./chart";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
    title: "Admin Overview",
};

const OverViewPage = async () => {
    await requireAdmin()

    const session = await auth();
    const summary = await getOrderSummary();

    if (session?.user?.role !== "admin") {
        throw new Error("Authorization Declined");
    }

    return (
        <div className="space-y-4 p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Dashboard Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        ₦
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {FormatCurrency(
                                summary.totalSales._sum.totalPrice?.toString() || 0
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {FormatNumber(summary.ordersCount)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Users</CardTitle>
                        <Users />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {FormatNumber(summary.usersCount)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Product</CardTitle>
                        <Barcode />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {FormatNumber(summary.productsCount)}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                <Card className="col-span-1 sm:col-span-2 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Charts data={{
                            salesData: summary.salesData
                        }} />
                    </CardContent>
                </Card>
                <Card className="col-span-1 sm:col-span-2 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>BUYER</TableHead>
                                    <TableHead>DATE</TableHead>
                                    <TableHead>TOTAL</TableHead>
                                    <TableHead>ACTIONS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {summary.latestSales.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            {item?.user?.name ? item.user.name : "Deleted User"}
                                        </TableCell>
                                        <TableCell>
                                            {formatDateTime(item.createdAt).dateOnly}
                                        </TableCell>
                                        <TableCell>{FormatCurrency(item.totalPrice)}</TableCell>
                                        <TableCell>
                                            <Link href={`/order/${item.id}`}>
                                                <span className="text-blue-500 hover:underline px-2">Details</span>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OverViewPage;
