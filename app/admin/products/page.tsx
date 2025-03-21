import { requireAdmin } from "@/lib/auth-guard";
import Link from "next/link";
import { getAllProducts, deleteProduct } from "@/lib/actions/product.actions";
import { FormatCurrency, formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import PaginationPage from "@/components/shared/pagination";
import DeleteDialogPage from "@/components/shared/delete-dialog";

const AdminProducts = async (props: {
    searchParams: Promise<{
        page: string;
        query: string;
        category: string;
    }>;
}) => {
    await requireAdmin();
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const searchText = searchParams.query || "";
    const category = searchParams.category || "";

    const product = await getAllProducts({
        query: searchText,
        page,
        category,
    });

    return (
        <div className="space-y-2">
            <div className="flex-between">
                <h1 className="h2-bold">Products</h1>
                <Button asChild variant="default">
                    <Link href="/admin/products/create">Create Product</Link>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>NAME</TableHead>
                        <TableHead className="text-right">PRICE</TableHead>
                        <TableHead>CATEGORY</TableHead>
                        <TableHead>STOCK</TableHead>
                        <TableHead>RATING</TableHead>
                        <TableHead className="W-[100px]">ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {product.data.map((products) => (
                        <TableRow key={products.id}>
                            <TableCell>{formatId(products.id)}</TableCell>
                            <TableCell>{products.name}</TableCell>
                            <TableCell className="text-right">
                                {FormatCurrency(products.price)}
                            </TableCell>
                            <TableCell>{products.category}</TableCell>
                            <TableCell>{products.stock}</TableCell>
                            <TableCell>{products.rating}</TableCell>
                            <TableCell className="flex gap-1">
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/admin/products/${products.id}`}>EDIT</Link>
                                </Button>
                                {/* DELETE */}
                                <DeleteDialogPage id={products.id} action={deleteProduct} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {product.totalPages > 1 && (
                <PaginationPage page={page} totalPages={product.totalPages} />
            )}
        </div>
    );
};

export default AdminProducts;
