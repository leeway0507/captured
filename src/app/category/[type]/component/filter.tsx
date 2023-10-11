"use client";

import "./filter.css";
import OptionArraySortBy from "./options-array-sort-by";
import OptionArraySelected from "./options-array";
import OptionArrayWithoutBox from "./options-array-without-box";

import type { initMetaProps } from "../type";
import { useEffect, useState } from "react";
import AccordionComponent from "@/app/components/accordion/accordion";
import Slider from "./options-array-range-slider";
import { useRouter } from "next/navigation";

interface FilterDropdownProps {
    initMeta: initMetaProps;
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}

export default function Accordion({ initMeta, isOpen, setIsOpen }: FilterDropdownProps) {
    const router = useRouter();
    const emptyMeta = {
        sortBy: [],
        brand: [],
        category: [],
        intl: [],
        price: [0, 0],
        sizeArray: [],
    };
    const [queryMeta, setQueryMeta] = useState<initMetaProps>(() => emptyMeta);

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
        const query =
            JSON.stringify(queryMeta) != JSON.stringify(emptyMeta) &&
            new URLSearchParams(JSON.stringify(queryMeta)).toString();

        query && (router.push(`\?filter=${query}`), router.refresh());
        // query ? (router.push(`\?filter=${query}`), router.refresh()) : router.push(window.location.href.split("?")[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryMeta]);

    if (initMeta === undefined) return null;

    return (
        <div className={`w-full h-full ${isOpen ? "block" : "hidden"}`} id="accordion-scroll">
            <AccordionComponent title="정렬순서" content={OptionArraySortBy(initMeta.sortBy, setSortBy)} cat="sortBy" />
            <AccordionComponent
                title="브랜드"
                content={OptionArrayWithoutBox(initMeta.brand, setBrand)}
                cat="category"
            />
            <AccordionComponent
                title="카테고리"
                content={OptionArraySelected(initMeta.category, setCategory)}
                cat="brand"
            />

            <AccordionComponent
                title="사이즈"
                content={OptionArraySelected(initMeta.sizeArray, setSizeArray)}
                cat="sizeArray"
            />
            <AccordionComponent title="배송" content={OptionArraySelected(initMeta.intl, setIntl)} cat="delivery" />
            <AccordionComponent title="가격" content={Slider(initMeta.price, setPrice)} cat="price" />
        </div>
    );
}
