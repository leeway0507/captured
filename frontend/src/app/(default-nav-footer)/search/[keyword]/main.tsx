"use client";
import { productCardProps } from "@/app/type";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductCard from "../../category/[...pageType]/component/product-card/product-card";
import SearchFilter from "./filter";

function createFilterValue(filterParams: any) {
    const filter = new URLSearchParams(filterParams);
    const filterValue: { [key: string]: string[] } = {};

    filter.forEach((value, key) => {
        filterValue[key] = value.split(",");
    });
    return filterValue;
}

const filteredResultData = (data: productCardProps[], filterValue: { [key: string]: string[] }) => {
    const { sortBy, brand, categorySpec, intl, price, sizeArray } = filterValue;
    const intlObj = {
        국내배송: false,
        해외배송: true,
    };

    const filtedData = data.filter((item) => {
        const brandCondition = () => brand.includes(item.brand);
        const categoryCondition = () => categorySpec.includes(item.categorySpec);
        const intlCondition = () => intl.map((v) => intlObj[v as keyof typeof intlObj]).includes(item.intl);
        const priceCondition = () => item.price >= Number(price[0]) && item.price <= Number(price[1]);
        const sizeCondition = () => sizeArray.map((v) => item.size.includes(v)).includes(true);

        const brandFilter = brand === undefined ? true : brandCondition();
        const categoryFilter = categorySpec === undefined ? true : categoryCondition();
        const intlFilter = intl === undefined ? true : intlCondition();
        const priceFilter = price === undefined ? true : priceCondition();
        const sizeFilter = sizeArray === undefined ? true : sizeCondition();
        return brandFilter && categoryFilter && intlFilter && priceFilter && sizeFilter;
    });

    if (sortBy === undefined) return filtedData;

    const sortedData = filtedData.sort((a, b) => {
        if (sortBy[0] === "높은 가격 순") {
            return b.price - a.price;
        } else if (sortBy[0] === "낮은 가격 순") {
            return a.price - b.price;
        } else {
            return 0;
        }
    });
    return sortedData;
};

const SearchResult = ({
    searchResult,
    initFilterMeta,
    userFilterValue,
}: {
    searchResult: productCardProps[];
    initFilterMeta: any;
    userFilterValue: any;
}) => {
    return (
        <>
            <SearchFilter initFilterMeta={initFilterMeta} pageType={"all"} filterValue={userFilterValue}>
                <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 page-container`}>
                    {searchResult.map((data) => {
                        return (
                            <div key={data.sku} className={`relative ${data.size === "" && "opacity-60"}`}>
                                {data.size === "" && (
                                    <div className="absolute top-[5%] left-0 text-main-black">SoldOut</div>
                                )}
                                <ProductCard props={data} />
                            </div>
                        );
                    })}
                </div>
            </SearchFilter>
        </>
    );
};

const Main = ({ initFilterMeta, resultData }: { initFilterMeta: any; resultData: productCardProps[] }) => {
    const [searchResult, setSearchResult] = useState<productCardProps[]>(() => resultData);
    const [filterValue, setFilterValue] = useState<{ [key: string]: string[] }>({});
    const filterParams = useSearchParams();

    useEffect(() => {
        setSearchResult(filteredResultData(resultData, filterValue));
    }, [filterParams, resultData, filterValue]);

    useEffect(() => {
        setFilterValue(createFilterValue(filterParams));
    }, [filterParams]);

    return <SearchResult searchResult={searchResult} initFilterMeta={initFilterMeta} userFilterValue={filterValue} />;
};

export default Main;
