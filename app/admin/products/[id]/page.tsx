import NotFoundPage from "@/app/not-found";
import ProductForm from "@/components/admin/product-form";
import { GetProductById } from "@/lib/actions/product.actions";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Admin Product Update'
}

const AdminProductUpdatePage = async (props: {
    params: Promise<{
        id: string
    }>
}) => {
    const { id } = await props.params;

    const product = await GetProductById(id)

    if (!product) return NotFoundPage()
    return <div className="space-y-8 max-w-5xl mx-auto">
        <h1 className="h2-bold">Update Product</h1>

        <ProductForm type="Update" product={product} productId={product.id} />

    </div>;
}

export default AdminProductUpdatePage;