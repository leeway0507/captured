"use client";

import "./filter.css";
import { InlineContentShowAll, InlineContentShowSelected } from "./inline-content";
import { useEffect, useState } from "react";

interface FilterDropdownProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Accordion({ isOpen, setIsOpen }: FilterDropdownProps) {
    const [brand, setBrand] = useState<Array<string>>(["adidas original", "nike"]);
    const [category, setCategory] = useState<Array<string>>(["신발", "자켓", "티셔츠"]);
    const [shipping, setShipping] = useState<Array<string>>(["해외배송", "국내배송"]);
    const [price, setPrice] = useState<Array<string>>(["10,000 - 20,000원", "20,000 - 50,000원"]);
    const [size, setSize] = useState<{ sizeType: string; size: Array<string> }[]>([
        { sizeType: "신발", size: ["220", "230", "235", "240"] },
        { sizeType: "상의", size: ["S", "M", "L", "XL"] },
    ]);

    const accordionComponent = (title: string, content: React.ReactNode, cat: string) => {
        const id = "accordion-" + cat;
        return (
            <div className="arrodion">
                <input type="checkbox" id={id} className="click-effect" />
                <label htmlFor={id} className="text-xl-2xl">
                    <div className="flex justify-between">
                        {title}
                        <em style={{ background: "url(/icons/expand.svg)" }} />
                    </div>
                </label>
                {content}
            </div>
        );
    };
    const AdoptFilter = () => {
        setIsOpen(false);
        // add spinner
        //API call
        // catName, filterMeta
    };

    return (
        <>
            <div className={`w-full ${isOpen ? "block" : "hidden"}`}>
                {accordionComponent("카테고리", InlineContentShowSelected(brand, setBrand), "category")}
                {accordionComponent("브랜드", InlineContentShowSelected(category, setCategory), "brand")}
                {accordionComponent("사이즈", InlineContentShowAll(size, setSize), "size")}
                {accordionComponent("배송", InlineContentShowSelected(shipping, setShipping), "delivery")}
                {accordionComponent("가격", InlineContentShowSelected(price, setPrice), "price")}

                <div
                    className="text-light-gray flex-center p-4 bg-main-black text-lg-xl tracking-widest"
                    onClick={AdoptFilter}>
                    적용하기
                </div>
            </div>
        </>
    );
}
