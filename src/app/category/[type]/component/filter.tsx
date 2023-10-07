"use client";

import "./filter.css";
import OptionArrayShowAll from "@/app/category/[type]/component/options-array-show-all";
import OptionArraySelected from "@/app/category/[type]/component/options-array-selected";

import type { SizeObject } from "../type";
import { useState } from "react";
import AccordionComponent from "@/app/components/accordion/accordion";

interface FilterDropdownProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Accordion({ isOpen, setIsOpen }: FilterDropdownProps) {
    const [brand, setBrand] = useState<Array<string>>(["adidas original", "nike"]);
    const [category, setCategory] = useState<Array<string>>(["신발", "자켓", "티셔츠"]);
    const [shipping, setShipping] = useState<Array<string>>(["해외배송", "국내배송"]);
    const [price, setPrice] = useState<Array<string>>(["10,000 - 20,000원", "20,000 - 50,000원"]);
    const [size, setSize] = useState<SizeObject[]>([
        { sizeType: "신발", size: ["220", "230", "235", "240"] },
        { sizeType: "상의", size: ["S", "M", "L", "XL"] },
    ]);

    const AdoptFilter = () => {
        setIsOpen(false);
        // add spinner
        //API call
        // catName, filterMeta
    };

    return (
        <div className={`w-full h-full ${isOpen ? "block" : "hidden"}`}>
            <AccordionComponent title="카테고리" content={OptionArraySelected(brand, setBrand)} cat="category" />
            <AccordionComponent title="브랜드" content={OptionArraySelected(category, setCategory)} cat="brand" />
            <AccordionComponent
                title="사이즈"
                content={OptionArrayShowAll({ contentList: size, setContentList: setSize, showTitle: false })}
                cat="size"
            />
            <AccordionComponent title="배송" content={OptionArraySelected(shipping, setShipping)} cat="delivery" />
            <AccordionComponent title="가격" content={OptionArraySelected(price, setPrice)} cat="price" />

            <div
                className="text-light-gray flex-center p-4 bg-main-black text-lg-xl tracking-widest"
                onClick={AdoptFilter}>
                적용하기
            </div>
        </div>
    );
}
