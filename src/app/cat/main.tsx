"use client";

import { useState } from "react";
import Image from "next/image";
import type { catProductCardProps } from "../cat/type";
import { useShoppingCart } from "../shopping-cart-context";
import ProductCard from "./component/product-card";
import Accordion from "./component/accordion";
import SortItem from "./component/sort-dropdown";

export default function Category() {
    const { mockDB } = useShoppingCart();

    const [openFilter, setOpenFilter] = useState<boolean>(false);

    const openFilterToggle = () => {
        setOpenFilter(!openFilter);
    };

    function FilterHeader() {
        return (
            <div className="sticky top-0 flex justify-between w-full py-3 ">
                <div className="flex-left grow">
                    <div className="flex" onClick={openFilterToggle}>
                        <Image src="/icons/filter.svg" width={24} height={0} alt={"filter"} className="bg-white" />
                        <div className="ms-2 w-[100px] tracking-widest ">필터</div>
                    </div>
                </div>
                <div className="flex-right grow">
                    <SortItem />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between w-full">
            <div className="flex-center flex-col py-10">
                <div className="flex-center w-full">
                    <div className="flex-center text-3xl text-sub-black capitalize">adidas originals</div>
                </div>
            </div>
            <div className="flex-center flex-col py-5 w-full px-3 relative cursor-pointer">
                <FilterHeader />
                <Accordion isOpen={openFilter} setIsOpen={setOpenFilter} />
                <div className={`grid grid-cols-2 tb:grid-cols-3 gap-1 ${openFilter ? "hidden" : "block"}`}>
                    {mockDB.map((props: catProductCardProps) => {
                        return ProductCard({ ...props });
                    })}
                </div>
            </div>
        </div>
    );
}
