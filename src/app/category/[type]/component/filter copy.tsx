"use client";

import "./filter.css";
import OptionArrayShowAll from "./options-array-show-all";
import OptionArraySelected from "./options-array";
// import OptionArraySelected from "./options-array-selected";

import type { SizeObject, filterMetaProps } from "../type";
import { useState } from "react";
import AccordionComponent from "@/app/components/accordion/accordion";
import Slider from "./options-array-range-slider";
import { getFilteredCategory } from "./fetch";
import { useRouter } from "next/navigation";
import { setCookie } from "./cookie";

interface FilterDropdownProps {
    initMeta: filterMetaProps;
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}

function Accordion({ initMeta, isOpen, setIsOpen }: FilterDropdownProps) {
    const router = useRouter();
    const [meta, setMeta] = useState(() => initMeta);

    const setBrand = (v: string[]) => {
        setMeta((meta) => ({ ...meta, brand: v }));
    };
    const setCategory = (v: string[]) => {
        setMeta((meta) => ({ ...meta, category: v }));
    };
    const setSize = (v: SizeObject[]) => {
        setMeta((meta) => ({ ...meta, sizeArray: v }));
    };
    const setIntl = (v: string[]) => {
        setMeta((meta) => ({ ...meta, intl: v }));
    };
    const setPrice = (v: number[]) => {
        setMeta((meta) => ({ ...meta, price: v }));
    };

    const AdoptFilter = () => {
        let queryMeta: filterMetaProps = {
            brand: ["all"],
            category: ["all"],
            intl: ["all"],
            price: [0],
            sizeArray: initMeta["sizeArray"].map((v) => ({ ...v, size: ["all"] })),
        };
        JSON.stringify(initMeta.brand) != JSON.stringify(meta.brand) && (queryMeta.brand = meta.brand);
        JSON.stringify(initMeta.category) != JSON.stringify(meta.category) && (queryMeta.category = meta.category);
        JSON.stringify(initMeta.intl) != JSON.stringify(meta.intl) && (queryMeta.intl = meta.intl);
        JSON.stringify(initMeta.price) != JSON.stringify(meta.price) && (queryMeta.price = meta.price);
        JSON.stringify(initMeta.sizeArray) != JSON.stringify(meta.sizeArray) && (queryMeta.sizeArray = meta.sizeArray);

        const query = new URLSearchParams(JSON.stringify(queryMeta)).toString();
        console.log(JSON.stringify(queryMeta));
        console.log(query);

        JSON.stringify(initMeta) != JSON.stringify(meta) && console.log(query);
        router.push(`\?${query}`);

        // getFilteredCategory(queryMeta).then((v) => {
        //     console.log(v);
        //     setIsOpen(false);
        // });
    };

    if (initMeta === undefined) {
        return <div>loading...</div>;
    }

    return (
        <div className={`w-full h-full ${isOpen ? "block" : "hidden"}`}>
            <AccordionComponent title="브랜드" content={OptionArraySelected(meta.brand, setBrand)} cat="category" />
            <AccordionComponent
                title="카테고리"
                content={OptionArraySelected(meta.category, setCategory)}
                cat="brand"
            />
            <AccordionComponent
                title="사이즈"
                content={OptionArrayShowAll({ contentList: meta.sizeArray, setContentList: setSize, showTitle: true })}
                cat="size"
            />
            <AccordionComponent title="배송" content={OptionArraySelected(meta.intl, setIntl)} cat="delivery" />
            <AccordionComponent title="가격" content={Slider(meta.price, setPrice)} cat="price" />

            <div className="black-bar-xl m-4" onClick={AdoptFilter}>
                적용하기
            </div>
        </div>
    );
}
