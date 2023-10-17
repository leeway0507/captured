"use client";
import type { productCardProps } from "@/app/type";
import EmblaCarouselMultiProducts from "@/app/components/carousel/EmblaCarouselMultiProducts";
import ProductCard from "@/app/category/[...pageType]/component/product-card";
import { useEffect, useState } from "react";
import PageLoading from "@/app/components/loading/page-loading";

export default function RelatedProducts() {
    // Open recent view
    const [productInfos, setProductInfos] = useState<productCardProps[] | undefined>(undefined);
    useEffect(() => {
        setProductInfos(JSON.parse(localStorage.getItem("recentView") || "[]"));
    }, []);

    if (productInfos === undefined) return <PageLoading />;

    return (
        <>
            <div className="text-xl-2xl pb-2">최근 본 아이템</div>
            <div className="flex justify-between overflow-hidden">
                <EmblaCarouselMultiProducts>
                    {productInfos.map((props: productCardProps, idx: number) => {
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
