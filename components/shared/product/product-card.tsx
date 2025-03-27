
import Link from "next/link";
import Image from "next/image";
import MotionWrapper from "@/helpers/motionwrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { product } from '@/types'

const ProductCard = ({ product }: { product: product }) => {
    return (
        <MotionWrapper>
            <Card className="w-full max-w-sm shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="p-0 items-center">
                    <Link href={`/product/${product.slug}`}>
                        <Image
                            src={product.images[0]}
                            alt={product.slug}
                            height={300}
                            width={300}
                            priority={true}
                            className="object-cover"
                        />
                    </Link>
                </CardHeader>
                <CardContent className="p-4 grid gap-4">
                    <div className="text-xs font-semibold">{product.brand}</div>
                    <Link href={`/product/${product.slug}`}>
                        <h2 className="text-sm font-medium">{product.name}</h2>
                    </Link>
                    <div className="flex-between gap-4">
                        <p>{product.rating}</p>
                        <ProductPrice value={Number(product.price)} />
                        {/* {product.stock > 0 ? (<p className="font-bold">₦{product.price}</p>) : (<p className="text-destructive">Out Of Stock</p>)} */}
                    </div>
                </CardContent>
            </Card>
        </MotionWrapper>

    );
};

export default ProductCard;
























































































































// import Link from "next/link";
// import Image from "next/image";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";

// const ProductCard = ({ product }: { product: any }) => {
//     return (
//         <Card className="w-full max-w-sm">
//             <CardHeader className="p-0 items-center">
//                 <Link href={`/product/${product.slug}`}>
//                     <Image
//                         src={product.images[0]}
//                         alt={product.slug}
//                         height={300}
//                         width={300}
//                         priority={true}
//                     />
//                 </Link>
//             </CardHeader>
//             <CardContent className="p-4 grid gap-4">
//                 <div className="text-3x">{product.brand}</div>
//                 <Link href={`/product/${product.slug}`}>
//                     <h2 className="text-sm font-medium">{product.name}</h2>
//                 </Link>
//             </CardContent>
//         </Card>
//     );
// };

// export default ProductCard;