import { product } from "@/types";
import ProductCard from "./product-card";



const ProductList = ({ data, title, limit }: { data: product[]; title?: string; limit?: number }) => {
    const limitedProduct = limit ? data.slice(0, limit) : data
    return (
        <div className="my-10">
            <h2 className="h2-bold mb-4">{title}</h2>
            {data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {limitedProduct.map((product: product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            ) : (
                <div>
                    <p>No Product Found</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;
