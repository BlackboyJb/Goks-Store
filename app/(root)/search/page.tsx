import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts } from "@/lib/actions/product.actions";



const SearchPage = async (props: {
    searchParams: Promise<{
        q?: string,
        category?: string,
        price?: string,
        rating?: string,
        sort?: string,
        page?: string,
        limit?: string

    }>
}) => {
    const { q = 'all', category = 'all', price = 'all', rating = 'all', sort = 'all', page = 'all', } = await props.searchParams
    const products = await getAllProducts({
        query: q,
        category,
        price,
        rating,
        sort,
        page: Number(page),
        limit: 14
    })

    return <div className="grid md:grid-cols-5 md:gap-5">
        <div className="filter-links">
            {/* filters */}
        </div>
        <div className="md:col-span-4 space-y-4">
            <div className="grid grid-cols-1 gap -4 md:grid-cols-3">
                {products.data.length === 0 && <div>No Product Found</div>}
                {products.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </div>;
}

export default SearchPage;