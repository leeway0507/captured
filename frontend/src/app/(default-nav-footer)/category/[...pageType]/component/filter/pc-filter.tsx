"use client";

import { useProductFilterProps } from "./hook/use-product-filter";
import type { filterMetaProps, initFilterMetaProps } from "../../type";
import AccordionComponent from "@/app/components/accordion/accordion";

interface FilterDropdownProps {
    initFilterMeta: initFilterMetaProps;
    productFilter: useProductFilterProps;
    isOpen: boolean;
    pageType: string;
}

export default function PcFilter({ initFilterMeta, productFilter, isOpen, pageType }: FilterDropdownProps) {
    const { sortBy, brand, category, size, intl, price } = productFilter;

    if (initFilterMeta === undefined) return <></>;

    return (
        <div className={`w-full h-full ${isOpen ? "block" : "hidden"}`} id="accordion-scroll">
            <AccordionComponent
                title="정렬순서"
                content={sortBy}
                cat="sortBy"
                contentClassNames="text-lg"
                titleClassNames="text-lg"
            />
            {initFilterMeta.brand && "brand" != (pageType as string) && (
                // brand 페이지에서는 브랜드 표시 X
                <AccordionComponent
                    title="브랜드"
                    content={brand}
                    cat="brand"
                    contentClassNames="scroll-bar max-h-[200px]"
                    titleClassNames="text-lg"
                />
            )}
            {initFilterMeta.category && (
                <AccordionComponent title="카테고리" content={category} cat="category" titleClassNames="text-lg" />
            )}

            <AccordionComponent title="사이즈" content={size} cat="sizeArray" titleClassNames="text-lg" />
            <AccordionComponent title="배송" content={intl} cat="delivery" titleClassNames="text-lg" />
            <AccordionComponent title="가격" content={price} cat="price" titleClassNames="text-lg" />
        </div>
    );
}
