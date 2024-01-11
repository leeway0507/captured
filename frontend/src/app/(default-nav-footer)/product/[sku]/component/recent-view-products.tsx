"use client";
import type { productCardProps } from "@/app/type";
import EmblaCarouselMultiProducts from "@/app/components/carousel/EmblaCarouselMultiProducts";
import ProductCard from "@/app/(default-nav-footer)/category/[...pageType]/component/infinite-scroll/product-card";
import { useEffect, useState } from "react";
import { RelatedProductsSkeleton } from "@/app/(default-nav-footer)/search/skeleton";
import styles from "@/app/components/carousel/styles.module.css";

const RecentViewProducts = () => {
    const [productInfos, setProductInfos] = useState<productCardProps[] | undefined>(undefined);

    useEffect(() => {
        setProductInfos(JSON.parse(localStorage.getItem("recentView") || "[]"));
    }, []);
    return productInfos;
};

export default function RelatedProducts() {
    // Open recent view

    const productInfos = RecentViewProducts();

    if (productInfos === undefined) return <RelatedProductsSkeleton />;

    return (
        <div className="grow flex flex-col">
            <div className="text-xl-2xl pb-2 font-bold">최근 본 아이템</div>
            <div>
                <EmblaCarouselMultiProducts>
                    {productInfos.toReversed().map((props: productCardProps, idx: number) => {
                        return (
                            <div key={idx} className={`${styles.embla__slide} flex-center`}>
                                <ProductCard props={props} isIntl={false} idx={idx} />
                            </div>
                        );
                    })}
                </EmblaCarouselMultiProducts>
            </div>
        </div>
    );
}
