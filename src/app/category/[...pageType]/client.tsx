"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Filter from "./component/filter";
import { initFilterMetaProps } from "./type";
import { productCardProps } from "@/app/type";

export default function CateogryClient({
    children,
    data,
    initFilterMeta,
    pageType,
}: {
    children: React.ReactNode;
    data: productCardProps[];
    initFilterMeta: initFilterMetaProps;
    pageType: string[];
}) {
    console.log("-----------category/client.tsx---------------");
    console.log("pageType: ", pageType);

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
            <div className="sticky top-0 flex justify-between w-full bg-white z-50 my-5 pt-2">
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
            <div className="flex-center text-3xl text-sub-black uppercase py-5 ">
                {/* {Array.isArray(type)
                    ? type[0].replace("-", " ").replace("%20", " ")
                    : type.replace("-", " ").replace("%20", " ")} */}
            </div>
            <div className="block lg:hidden">
                <FilterHeader />
                <Filter initFilterMeta={initFilterMeta} isOpen={openFilter} pageType={pageType[0]} />
                <div
                    className={`${openFilter ? "block" : "hidden"} black-bar-xl text-center my-4`}
                    onClick={openFilterToggle}>
                    적용하기
                </div>
                <div className={`${openFilter ? "hidden" : "block"}`}>{children}</div>
            </div>

            <div className="hidden lg:block w-full h-full">
                <div className="flex gap-8">
                    <div className="basis-1/4">
                        <div className="sticky top-0 pb-8">
                            <div className="overflow-scroll">
                                <Filter initFilterMeta={initFilterMeta} isOpen={true} pageType={pageType[0]} />
                            </div>
                        </div>
                    </div>
                    <div className="basis-3/4">{children}</div>
                </div>
            </div>
        </div>
    );
}
