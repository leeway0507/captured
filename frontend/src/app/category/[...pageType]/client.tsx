"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Filter from "./component/filter";
import { initFilterMetaProps } from "./type";
import { scrollToTop } from "@/app/components/utils/scroll";

export default function CateogryClient({
    children,
    initFilterMeta,
    pageType,
}: {
    children: React.ReactNode;

    initFilterMeta: initFilterMetaProps;
    pageType: string[];
}) {
    // console.log("-----------category/client.tsx---------------");
    // console.log("pageType: ", pageType);

    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const openFilterToggle = () => {
        setOpenFilter(!openFilter);
    };

    function FilterHeader() {
        return (
            <div className="sticky top-0 flex justify-between w-full bg-white z-40 pt-2">
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
        <div className="flex flex-col lg:flex-row justify-between w-full px-5 my-5 lg:gap-8 lg:pt-8 ">
            <div className="lg:basis-1/4 mb-4 sticky top-[100px] tb:top-[80px] bg-white z-40 lg:z-0 py-4">
                <div className="lg:hidden">
                    <FilterHeader />
                </div>
                <div className={`${openFilter ? "block" : "hidden"} lg:block lg:sticky lg:top-[80px] lg:z-10`}>
                    <Filter initFilterMeta={initFilterMeta} isOpen={true} pageType={pageType[0]} />
                </div>
                <div
                    className={`${openFilter ? "block" : "hidden"} black-bar-xl text-center my-4 lg:hidden`}
                    onClick={openFilterToggle}>
                    적용하기
                </div>
            </div>
            <div className={`${openFilter ? "hidden" : "block"} w-full flex-grow lg:block lg:basis-3/4`}>
                {children}
            </div>
        </div>
    );
}
