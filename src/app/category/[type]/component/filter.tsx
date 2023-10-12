"use client";

import "./filter.css";
import OptionArraySortBy from "./options-array-sort-by";
import OptionArraySelected from "./options-array";
import OptionArrayWithoutBox from "./options-array-without-box";

import type { initFilterMetaProps } from "../type";
import { useEffect, useState } from "react";
import AccordionComponent from "@/app/components/accordion/accordion";
import Slider from "./options-array-range-slider";
import { useRouter } from "next/navigation";

interface FilterDropdownProps {
    filterMeta: initFilterMetaProps;
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}

export default function Filter({ filterMeta, isOpen, setIsOpen }: FilterDropdownProps) {
    const router = useRouter();
    const emptyMeta = {
        sortBy: [],
        brand: [],
        category: [],
        intl: [],
        price: [],
        sizeArray: [],
    };
    const [queryMeta, setQueryMeta] = useState<initFilterMetaProps>(() => emptyMeta);

    const setSortBy = (v: string) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, sortBy: [v] }));
    };
    const setBrand = (v: string[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, brand: v }));
    };
    const setCategory = (v: string[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, category: v }));
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
        const adooptFilter = (queryMeta: initFilterMetaProps) => {
            const query = new URLSearchParams(queryMeta as any).toString();
            router.push(`\?${query}&refresh=true`);
        };

        filterEmpty
            ? window.location.search.includes("sortBy") && router.push(window.location.pathname)
            : adooptFilter(queryMeta);

        // window.location.reload();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryMeta]);

    if (filterMeta === undefined) return null;

    return (
        <div className={`w-full h-full ${isOpen ? "block" : "hidden"}`} id="accordion-scroll">
            <AccordionComponent
                title="정렬순서"
                content={OptionArraySortBy(filterMeta.sortBy, setSortBy)}
                cat="sortBy"
            />
            {filterMeta.brand && (
                <AccordionComponent
                    title="브랜드"
                    content={OptionArrayWithoutBox(filterMeta.brand, setBrand)}
                    cat="category"
                />
            )}
            {filterMeta.category && (
                <AccordionComponent
                    title="카테고리"
                    content={OptionArraySelected(filterMeta.category, setCategory)}
                    cat="brand"
                />
            )}

            <AccordionComponent
                title="사이즈"
                content={OptionArraySelected(filterMeta.sizeArray, setSizeArray)}
                cat="sizeArray"
            />
            <AccordionComponent title="배송" content={OptionArraySelected(filterMeta.intl, setIntl)} cat="delivery" />
            <AccordionComponent title="가격" content={Slider(filterMeta.price, setPrice)} cat="price" />
        </div>
    );
}
