import { useState } from "react";
import Image from "next/image";

import { useProductFilterProps } from "./hook/use-product-filter";
import { useOutsideAlerter } from "@/app/components/hook/use-outside-alerter";

export default function FilterLayOut({
    productFilter,
    pageType,
}: {
    productFilter: useProductFilterProps;
    pageType: string;
}) {
    const [data, setData] = useState<string>("");
    const pill = "bg-white rounded me-1 h-[36px] px-3 flex-center cursor-pointer border text-sm";

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
            <div className="h-full items-center flex whitespace-nowrap scroll-bar-x gap-1 ">
                {filterArr.map((item, idx) => {
                    return (
                        <button key={idx} className={`${pill}`} onClick={handler}>
                            {item}
                            <Image
                                src={"/icons/white/down-white.svg"}
                                className="ms-2"
                                width={12}
                                height={12}
                                alt="down"
                                priority
                            />
                        </button>
                    );
                })}
            </div>
            <FilterSpecific productFilter={productFilter} filterType={data} />
        </div>
    );
}

const FilterSpecific = ({
    productFilter,
    filterType,
}: {
    productFilter: useProductFilterProps;
    filterType: string;
}) => {
    const FilterElement = Object.entries(productFilter).find(([key, value]) => {
        switch (filterType) {
            case "정렬순":
                return key === "sortByElement" && value;
            case "브랜드":
                return key === "brandElement" && value;
            case "카테고리":
                return key === "categoryElement" && value;
            case "사이즈":
                return key === "sizeElement" && value;
            case "배송":
                return key === "intlElement" && value;
            case "가격":
                return key === "priceElement" && value;
        }
    });

    return (
        filterType &&
        FilterElement && (
            <div className="bg-white p-4 min-h-[50px] max-h-[300px] overflow-auto scroll-bar">{FilterElement[1]}</div>
        )
    );
};
