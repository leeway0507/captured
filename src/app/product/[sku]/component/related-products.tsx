"use client";
import type { productCardProps } from "@/app/type";
import EmblaCarouselMultiProducts from "@/app/components/carousel/EmblaCarouselMultiProducts";
import ProductCard from "@/app/category/[...pageType]/component/product-card";

export default function RelatedProducts({ arr }: { arr: productCardProps[] }) {
    const producInfos: productCardProps[] = arr;

    return (
        <>
            <div className="text-xl pb-2">최근 본 상품</div>
            <div className="flex justify-between overflow-hidden">
                <EmblaCarouselMultiProducts>
                    {producInfos.map((props: productCardProps, idx: number) => {
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
