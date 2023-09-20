"use client";

import { useState } from "react";
import Image from "next/image";
import type { catProductCardProps } from "@/app/product/type";

import { useShoppingCart } from "@/app/shopping-cart-context";
import EmblaCarouselMultiProducts from "@/app/components/carousel/EmblaCarouselMultiProducts";
import ProductCard from "@/app/category/component/product-card";

export default function RelatedProducts({ producInfos }: { producInfos: catProductCardProps[] }) {
    const { mockDB } = useShoppingCart();
    const [product, setProduct] = useState(mockDB);

    return (
        <>
            <div className="text-xl pb-2">연관상품</div>
            <div className="flex justify-between">
                <EmblaCarouselMultiProducts>
                    {mockDB.map((props: catProductCardProps, idx: number) => {
                        return (
                            <div key={idx} className="embla__slide">
                                <ProductCard {...props} />
                            </div>
                        );
                    })}
                </EmblaCarouselMultiProducts>
            </div>
        </>
    );
}
