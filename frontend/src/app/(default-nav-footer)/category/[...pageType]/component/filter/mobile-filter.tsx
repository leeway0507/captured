"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useOutsideAlerter } from "@/app/components/hook/use-outside-alerter";
import { useProductFilterProps } from "./hook/use-product-filter";
import { useParams } from "next/navigation";

const customUnderLine = "font-bold underline underline-offset-[11px] decoration-2";

const LatestPageNav = ({ pageType }: { pageType: string }) => {
    return (
        <>
            <Link href="/category/latest" className={`ps-0 p-2 ${pageType === "latest" && customUnderLine}`}>
                All
            </Link>
            <Link href="/category/shoes" className={`p-2 ${pageType === "shoes" && customUnderLine}`}>
                SHOES
            </Link>
            <Link href="/category/clothing" className={`p-2 ${pageType === "clothing" && customUnderLine}`}>
                CLOTHING
            </Link>
            <Link href="/category/accessory" className={`pe-0 p-2 ${pageType === "accessory" && customUnderLine}`}>
                ACCESSORY
            </Link>
        </>
    );
};
const BrandPageNav = () => {
    const { pageType } = useParams();
    const brandName = pageType[1].replace("%20", " ");
    return <div className="p-2 flex-left w-full font-bold uppercase">{brandName}</div>;
};

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
        <div className="tb:hidden h-[50px] px-2 flex items-center  w-full whitespace-nowrap scroll-bar-x bg-white">
            <div className="basis-1/5 border-b">
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
                            src={"/icons/white/filter-white.svg"}
                            alt="search"
                            width="20"
                            height="20"
                            className="m-2 me-6"
                            priority
                        />
                    )}
                </button>
            </div>
            <div className="flex grow justify-between items-center text-sm border-b">
                {pageType === "brand" ? <BrandPageNav /> : <LatestPageNav pageType={pageType} />}
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
            <div className="bg-white border-b py-4 px-4 borde min-h-[100px] max-h-[300px] overflow-auto scroll-bar">
                {FilterElement[1]}
            </div>
        )
    );
};

export const MobileFilterPage = ({
    productFilter,
    pageType,
}: {
    productFilter: useProductFilterProps;
    pageType: string;
}) => {
    const [data, setData] = useState<string>("");
    const pill = "rounded-lg mx-1 h-[36px] px-4 text-sm flex-center cursor-pointer ";
    const selected = "bg-main-black text-white";
    const notSelected = "bg-white text-sub-black";

    const handler = (e: any) => {
        const v = e.target.innerText;
        v === data ? setData("") : setData(v);
    };

    const AlertRef = useOutsideAlerter(() => setData(""));

    var filterArr = ["정렬순", "브랜드", "카테고리", "사이즈", "배송", "가격"];

    // brand 페이지에서는 브랜드 표시 X
    if ("brand" === (pageType as string)) filterArr = filterArr.filter((item) => item !== "브랜드");

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

const MobileFilter = ({ productFilter, pageType }: { productFilter: useProductFilterProps; pageType: string }) => {
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const filterToggle = () => {
        setOpenFilter(!openFilter);
    };

    return (
        <>
            <MobileFilterHeader isOpen={openFilter} openToggle={filterToggle} pageType={pageType} />
            <div className={`${openFilter ? "block" : "hidden"} h-[50px] bg-light-gray tb:hidden `}>
                <MobileFilterPage productFilter={productFilter} pageType={pageType} />
            </div>
        </>
    );
};

export default MobileFilter;
