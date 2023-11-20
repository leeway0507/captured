"use client";

import "./filter.css";
import OptionArraySortBy from "./options-array-sort-by";
import OptionArraySelected from "./options-array";
import OptionArrayWithoutBox from "./options-array-without-box";

import type { filterMetaProps, initFilterMetaProps } from "../type";
import { useEffect, useState } from "react";
import AccordionComponent from "@/app/components/accordion/accordion";
import Slider from "./options-array-range-slider";
import { useRouter } from "next/navigation";

interface FilterDropdownProps {
    initFilterMeta: initFilterMetaProps;
    isOpen: boolean;
    pageType: string;
}

const selectFilterType = (initFilterMeta: initFilterMetaProps, pageType: string) => {
    // 제품 분류에 따른 제품 상세 카테고리, 사이즈 리턴
    switch (pageType) {
        case "shoes":
            return initFilterMeta.category["신발"];
        case "clothing":
            return initFilterMeta.category["의류"];
        case "accessory":
            return initFilterMeta.category["기타"];
        default:
            return initFilterMeta.category["전체"];
    }
};

export default function Filter({ initFilterMeta, isOpen, pageType }: FilterDropdownProps) {
    const { productType, sizeArray } = selectFilterType(initFilterMeta, pageType);

    // console.log("-----------filter.tsx---------------");
    // console.log("pageType: ", pageType);
    // console.log("initFilterMeta: ", initFilterMeta);
    // console.log("productType: ", productType);
    // console.log("sizeArray: ", sizeArray);
    // console.log("--------------------------");

    const router = useRouter();
    const emptyMeta = {
        sortBy: [],
        brand: [],
        category: [],
        categorySpec: [],
        sizeArray: [],
        intl: [],
        price: [],
    };
    const [queryMeta, setQueryMeta] = useState<filterMetaProps>(() => emptyMeta);

    const setSortBy = (v: string) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, sortBy: [v] }));
    };
    const setBrand = (v: string[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, brand: v }));
    };
    const setCategory = (v: string[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, categorySpec: v }));
    };
    const setSizeArray = (v: string[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, sizeArray: v }));
    };
    const setIntl = (v: string[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, intl: v }));
    };
    const setPrice = (v: number[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, price: v }));
    };

    useEffect(() => {
        const filterEmpty = JSON.stringify(queryMeta) == JSON.stringify(emptyMeta);
        const adooptFilter = (queryMeta: filterMetaProps) => {
            const query = new URLSearchParams(queryMeta as any).toString();
            router.push(`\?${query}&refresh=true`);
        };

        filterEmpty
            ? window.location.search.includes("sortBy") && router.push(window.location.pathname)
            : adooptFilter(queryMeta);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryMeta]);

    // shoes, clothing, accessory

    if (initFilterMeta === undefined) return <div>404 NOT FOUND</div>;

    return (
        <div className={`w-full h-full ${isOpen ? "block" : "hidden"}`} id="accordion-scroll">
            <AccordionComponent
                title="정렬순서"
                content={OptionArraySortBy(initFilterMeta.sortBy, setSortBy)}
                cat="sortBy"
                contentClassNames="text-lg"
                titleClassNames="text-lg"
            />
            {initFilterMeta.brand && "brand" != (pageType as string) && (
                // brand 페이지에서는 브랜드 표시 X
                <AccordionComponent
                    title="브랜드"
                    content={OptionArrayWithoutBox(initFilterMeta.brand, setBrand)}
                    cat="category"
                    contentClassNames="scroll-bar max-h-[200px]"
                    titleClassNames="text-lg"
                />
            )}
            {initFilterMeta.category && (
                // category page에서는 표시 x
                <AccordionComponent
                    title="카테고리"
                    content={OptionArraySelected(productType, setCategory)}
                    cat="brand"
                    titleClassNames="text-lg"
                />
            )}

            <AccordionComponent
                title="사이즈"
                content={OptionArraySelected(sizeArray, setSizeArray)}
                cat="sizeArray"
                titleClassNames="text-lg"
            />
            <AccordionComponent
                title="배송"
                content={OptionArraySelected(initFilterMeta.intl, setIntl)}
                cat="delivery"
                titleClassNames="text-lg"
            />
            <AccordionComponent
                title="가격"
                content={Slider(initFilterMeta.price, setPrice)}
                cat="price"
                titleClassNames="text-lg"
            />
        </div>
    );
}
