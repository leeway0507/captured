"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Accordion from "./component/filter";
import SortItem from "./component/sort-dropdown";
import { useParams } from "next/navigation";
import { productCardProps } from "@/app/type";

export default function CateogryClient({ children, data }: { children: React.ReactNode; data: productCardProps[] }) {
    const { type } = useParams();
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const openFilterToggle = () => {
        setOpenFilter(!openFilter);
    };
    useEffect(() => {
        data?.map((props) => {
            const sku = props.sku.toString();
            return localStorage.getItem(sku) === null && localStorage.setItem(sku, JSON.stringify(props));
        });
    }, [data]);

    function FilterHeader() {
        return (
            <div className="sticky top-0 flex justify-between w-full pt-5 ">
                <div className="flex-left grow ">
                    <div className="flex link-animation" onClick={openFilterToggle}>
                        <Image src="/icons/filter.svg" width={24} height={0} alt={"filter"} className="bg-white" />
                        <div className="ms-2 w-[100px] tracking-widest ">필터</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between w-full px-5">
            <div className="flex-center text-2xl text-sub-black uppercase pt-5">
                {Array.isArray(type)
                    ? type[0].replace("-", " ").replace("%20", " ")
                    : type.replace("-", " ").replace("%20", " ")}
            </div>
            <div className="flex-center flex-col w-full h-full px-3 pb-5 relative cursor-pointer"></div>
            <div>
                <div className="py-4">
                    <FilterHeader />
                </div>
                <Accordion isOpen={openFilter} setIsOpen={setOpenFilter} />
                <div className={` ${openFilter ? "hidden" : "block"}`}>{children}</div>
            </div>
        </div>
    );
}
