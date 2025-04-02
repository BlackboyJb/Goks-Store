'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import AutoPlay from 'embla-carousel-autoplay'
import { product } from "@/types";
import Link from "next/link";
import Image from "next/image";

const ProductCarousel = ({ data }: { data: product[] }) => {
    return (
        // <Carousel className="w-full mb-12" opts={{
        //     loop: true
        // }} plugins={[AutoPlay({ delay: 1000, stopOnInteraction: true, stopOnMouseEnter: true })]}>
        //     <CarouselContent>
        //         {data.map((product: product) => (
        //             <CarouselItem key={product.id}>
        //                 {/* <Link href={`/product/${product.slug}`}>
        //                     <div className="relative mx-auto">
        //                         <Image src={product.banner!} alt={product.name} height='0' width='0' sizes="50vw" className="w-full h-auto" />

        //                     </div>
        //                 </Link> */}
        //                 <Link href={`/product/${product.slug}`}>
        //                     <div className="relative w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[16/9]">
        //                         <Image
        //                             src={product.banner!}
        //                             alt={product.name}
        //                             layout="fill"
        //                             objectFit="contain"  // Keeps the image fully visible
        //                             className="rounded-lg"
        //                         />
        //                     </div>
        //                 </Link>

        //             </CarouselItem>
        //         ))}
        //     </CarouselContent>
        //     <CarouselPrevious />
        //     <CarouselNext />
        // </Carousel>

        <Carousel className="w-full mb-12" opts={{ loop: true }}
            plugins={[AutoPlay({ delay: 1000, stopOnInteraction: true, stopOnMouseEnter: true })]}>

            <CarouselContent>
                {data.map((product: product) => (
                    <CarouselItem key={product.id}>
                        <Link href={`/product/${product.slug}`}>
                            <div className="relative w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[16/9]">
                                <Image
                                    src={product.banner!}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-lg"
                                />
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Hide Previous/Next buttons on small screens */}
            <div className="hidden sm:block">
                <CarouselPrevious />
                <CarouselNext />
            </div>

        </Carousel>

    );
}

export default ProductCarousel;












// <div className="absolute inset-0 flex items-end justify-center">
//                                     {/* <h2 className="bg-gray-900 bg-opacity-50 text-2xl font-bold px-2 text-white">
//                                         {product.name}
//                                     </h2> */}
//                                 </div>