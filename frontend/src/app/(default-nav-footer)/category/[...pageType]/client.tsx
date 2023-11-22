"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Filter from "./component/filter/filter";
import { initFilterMetaProps } from "./type";
import Link from "next/link";
import useProductFilter, { useProductFilterProps } from "./component/filter/hook/use-product-filter";
import { useOutsideAlerter } from "@/app/components/hook/use-outside-alerter";

function MobileFilterHeader({
    isOpen,
    openToggle,
    pageType,
}: {
    isOpen: boolean;
    openToggle: (v: any) => void;
    pageType: string;
}) {
    return (
        <div className="tb:hidden h-[50px] px-2 flex items-center gap-2 w-full whitespace-nowrap scroll-bar-x bg-white">
            <div className="basis-1/5 ">
                <button className=" flex-left" onClick={openToggle}>
                    {isOpen ? (
                        <Image
                            src={"/icons/x-mark.svg"}
                            alt="x-mark"
                            width="20"
                            height="20"
                            className="m-2 me-6"
                            priority
                        />
                    ) : (
                        <Image
                            src={"/icons/filter.svg"}
                            alt="search"
                            width="20"
                            height="20"
                            className="m-2 me-6"
                            priority
                        />
                    )}
                </button>
            </div>
            <div className="flex grow justify-between items-center text-sm h-full">
                <Link href="/category/latest" className={`ps-0 p-2 ${pageType === "latest" && "underline"}`}>
                    All
                </Link>
                <Link href="/category/shoes" className={`p-2 ${pageType === "shoes" && "underline"}`}>
                    SHOES
                </Link>
                <Link href="/category/clothing" className={`p-2 ${pageType === "clothing" && "underline"}`}>
                    CLOTHING
                </Link>
                <Link href="/category/accessory" className={`pe-0 p-2 ${pageType === "accessory" && "underline"}`}>
                    ACCESSORY
                </Link>
            </div>
        </div>
    );
}

const FilterOptions = ({ productFilter, filterType }: { productFilter: useProductFilterProps; filterType: string }) => {
    const FilterElement = Object.entries(productFilter).find(([key, value]) => {
        switch (filterType) {
            case "정렬순":
                return key === "sortBy" && value;
            case "브랜드":
                return key === "brand" && value;
            case "카테고리":
                return key === "category" && value;
            case "사이즈":
                return key === "size" && value;
            case "배송":
                return key === "intl" && value;
            case "가격":
                return key === "price" && value;
        }
    });

    return (
        filterType &&
        FilterElement && (
            <div className="bg-white border-b py-4 px-4 borde min-h-[100px] max-h-[300px] overflow-auto scroll-bar ">
                {FilterElement[1]}
            </div>
        )
    );
};
const MobileFilterPage = ({ productFilter }: { productFilter: useProductFilterProps }) => {
    const [data, setData] = useState<string>("");
    const pill = "rounded-lg mx-1 h-[36px] px-4 text-sm flex-center cursor-pointer ";
    const selected = "bg-main-black text-white";
    const notSelected = "bg-white text-sub-black";

    const handler = (e: any) => {
        const v = e.target.innerText;
        v === data ? setData("") : setData(v);
    };

    const AlertRef = useOutsideAlerter(() => setData(""));

    const filterArr = ["정렬순", "브랜드", "카테고리", "사이즈", "배송", "가격"];
    return (
        <div ref={AlertRef} className="h-full">
            <div className="h-full items-center flex whitespace-nowrap scroll-bar-x gap-1">
                {filterArr.map((item, idx) => {
                    return (
                        <button
                            key={idx}
                            className={`${pill} ${data === item ? selected : notSelected}`}
                            onClick={handler}>
                            {item}
                        </button>
                    );
                })}
            </div>
            <FilterOptions productFilter={productFilter} filterType={data} />
        </div>
    );
};

const MobileFilter = ({ productFilter, pageType }: { productFilter: any; pageType: string }) => {
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const filterToggle = () => {
        setOpenFilter(!openFilter);
    };

    return (
        <>
            <MobileFilterHeader isOpen={openFilter} openToggle={filterToggle} pageType={pageType} />
            <div className={`${openFilter ? "block" : "hidden"} h-[50px] bg-light-gray tb:hidden `}>
                <MobileFilterPage productFilter={productFilter} />
            </div>
        </>
    );
};

function FilterPage({ initFilterMeta, pageType }: { initFilterMeta: initFilterMetaProps; pageType: string }) {
    const productFilter = useProductFilter(initFilterMeta, pageType);
    return (
        <>
            <MobileFilter productFilter={productFilter} pageType={pageType} />
            <div className="hidden tb:block tb:sticky tb:top-[80px] tb:z-10">
                <Filter
                    initFilterMeta={initFilterMeta}
                    productFilter={productFilter}
                    isOpen={true}
                    pageType={pageType}
                />
            </div>
            {/* <button
                className={`${openFilter ? "block" : "hidden"} black-bar-xl text-center my-4 tb:hidden w-full`}
                onClick={filterToggle}>
                적용하기
            </button> */}
        </>
    );
}

export default function CateogryClient({
    children,
    initFilterMeta,
    pageType,
}: {
    children: React.ReactNode;

    initFilterMeta: initFilterMetaProps;
    pageType: string[];
}) {
    return (
        <div className="flex flex-col tb:flex-row justify-between w-full px-2 tb:gap-8 tb:pt-8 ">
            <div className="tb:basis-1/3 lg:basis-1/4 sticky top-[50px] tb:mb-4 tb:top-[80px] bg-white z-10 tb:z-0">
                <FilterPage initFilterMeta={initFilterMeta} pageType={pageType[0]} />
            </div>
            <div className={`w-full flex-grow tb:block tb:basis-2/3 lg:basis-3/4`}>{children}</div>
        </div>
    );
}
