import { GetProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProductPrice from "@/components/shared/product/product-price";
import ProductImages from "@/components/shared/product/product-images";
import GoBackButton from "@/helpers/GoBackButton";
import AddtoCart from "@/components/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/cart.action";
import ReviewList from "./review-list";
import { auth } from "@/auth";
import Rating from "@/components/shared/product/ratings";



const ProductDetailsPage = async (props: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await props.params;

    const product = await GetProductBySlug(slug);
    if (!product) notFound();

    const session = await auth();
    const userId = session?.user?.id;

    const cart = await getMyCart();

    return (
        <>
            <section>
                <GoBackButton />
                <div className="grid grid-cols-1 md:grid-cols-5 gap-9">
                    {/* image columns */}
                    <div className="col-span-2">
                        <ProductImages images={product.images} />
                    </div>
                    {/* {details coulmn} */}
                    <div className="col-span-2 p-5">
                        <div className="flex flex-col gap-6">
                            <p className="text-xl">{product.brand}</p>
                            <h1 className="h3-bold">{product.name}</h1>
                            <Rating value={Number(product.rating)} />
                            <p>{product.numReviews} reviews</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <ProductPrice
                                    value={Number(product.price)}
                                    className="w-30 rounded-full bg-green-100 text-green-700 px-5 py-2"
                                />
                            </div>
                        </div>
                        <div className="mt-10">
                            <p className="h3-bold">Description</p>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    {/* Action Column */}
                    <div>
                        <Card>
                            <CardContent className="p-4">
                                <div className="mb-2 flex justify-between">
                                    <div>Price</div>
                                    <div>
                                        <ProductPrice value={Number(product.price)} />
                                    </div>
                                </div>
                                <div className="mb-2 flex justify-between">
                                    <div>status</div>
                                    {product.stock > 0 ? (
                                        <Badge className="text-1xl" variant="outline">
                                            In Stock
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive">Out of Stock</Badge>
                                    )}
                                </div>
                                {product.stock > 0 && (
                                    <div className="flex-center">
                                        <AddtoCart
                                            cart={cart}
                                            item={{
                                                productId: product.id,
                                                name: product.name,
                                                slug: product.slug,
                                                price: product.price,
                                                qty: 1,
                                                image: product.images![0],
                                            }}
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="mt-10">
                <h2 className="h2-bold">Customer Reviews</h2>
                <ReviewList
                    userId={userId || ""}
                    productId={product.id}
                    productSlug={product.slug}
                />
            </section>
        </>
    );
};

export default ProductDetailsPage;
