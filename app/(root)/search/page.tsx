import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts, getAllProductByCategory } from "@/lib/actions/product.actions";
import Link from "next/link";


const priceRanges = [
    {
        name: '₦10,000 to ₦30,000',
        value: '10000-30000'
    },
    {
        name: '₦31,000 to ₦40,000',
        value: '31000-40000'
    },
    {
        name: '₦41,000 to ₦50,000',
        value: '41000-50000'
    },
    {
        name: '₦51,000 to ₦60,000',
        value: '51000-60000'
    },
    {
        name: '₦61,000 to ₦70,000',
        value: '61000-70000'
    },
    {
        name: '₦71,000 to ₦80,000',
        value: '71000-80000'
    },
    {
        name: '₦100,000 to ₦800,000',
        value: '100000-800000'
    },
]

const ratings = [4, 3, 2, 1]


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

    //construct uril filter
    const urlFilter = ({
        c,
        s,
        p,
        r,
        pg
    }: {
        c?: string;
        s?: string;
        p?: string;
        r?: string;
        pg?: string;
    }) => {
        const params = { q, category, price, rating, sort, page }

        if (c) params.category = c
        if (s) params.sort = s
        if (p) params.price = p
        if (r) params.rating = r
        if (pg) params.page = pg

        return `/search?${new URLSearchParams(params).toString()}`
    }
    const products = await getAllProducts({
        query: q,
        category,
        price,
        rating,
        sort,
        page: Number(page),
        limit: 14
    })

    //Get all Product Category
    const categories = await getAllProductByCategory()

    return <div className="grid md:grid-cols-5 md:gap-5">
        <div className="filter-links">
            {/* Categories Link */}
            <div className="text-xl mb-2 mt-3"> Category</div>
            <div>
                <ul className="space-y-1">
                    <li>
                        <Link className={`${(category === 'all' || category === '') && 'font-bold'}`} href={urlFilter({ c: 'all' })}>Any</Link>
                    </li>
                    {categories.map((x) => (
                        <li key={x.category}>
                            <Link className={`${category === x.category && 'font-bold'}`} href={urlFilter({ c: x.category })}>{x.category}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Prices Link */}
            <div className="text-xl mb-2 mt-8"> Price</div>
            <div>
                <ul className="space-y-1">
                    <li>
                        <Link className={`${price === 'all' && 'font-bold'}`} href={urlFilter({ p: 'all' })}>Any</Link>
                    </li>
                    {priceRanges.map((p) => (
                        <li key={p.value}>
                            <Link className={`${price === p.value && 'font-bold'}`} href={urlFilter({ p: p.value })}>{p.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Ratings Link */}
            <div className="text-xl mb-2 mt-8">Ratings</div>
            <div>
                <ul className="space-y-1">
                    <li>
                        <Link className={`${rating === 'all' && 'font-bold'}`} href={urlFilter({ r: 'all' })}>Any</Link>
                    </li>
                    {ratings.map((r) => (
                        <li key={r}>
                            <Link className={`${rating === r.toString() && 'font-bold'}`} href={urlFilter({ r: `${r}` })}>{`${r} stars & up`}</Link>
                        </li>
                    ))}
                </ul>
            </div>
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