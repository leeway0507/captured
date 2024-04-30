"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initFilterMetaProps, filterMetaProps } from "../../../type";
import OptionArraySelected from "../options-array-selected";
import OptionArraySortBy from "../options-array-sort-by";
import OptionArrayWithoutBox from "../options-array-without-box";
import Slider from "../options-array-range-slider";

export type useProductFilterProps = {
    sortByElement: JSX.Element;
    brandElement: JSX.Element;
    categoryElement: JSX.Element;
    sizeElement: JSX.Element;
    intlElement: JSX.Element;
    priceElement: JSX.Element;
};

const selectFilterType = (initFilterMeta: initFilterMetaProps, pageType: string) => {
    // 제품 분류에 따른 제품 상세 카테고리, 사이즈 리턴
    switch (pageType) {
        case "shoes":
            return initFilterMeta.category["신발"];
        case "clothing":
            return initFilterMeta.category["의류"];
        case "accessory":
            return initFilterMeta.category["기타"];
        default:
            return initFilterMeta.category["전체"];
    }
};

const useProductFilter = (
    initFilterMeta: initFilterMetaProps,
    pageType: string,
    filterValue: filterMetaProps | undefined
) => {
    const { productType, sizeArray } = selectFilterType(initFilterMeta, pageType);
    const router = useRouter();
    const Meta = {
        sortBy: [],
        brand: [],
        category: [],
        categorySpec: [],
        sizeArray: [],
        intl: [],
        price: [],
    };
    const [queryMeta, setQueryMeta] = useState<filterMetaProps>(() => filterValue || Meta);

    const setSortBy = (v: string) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, sortBy: [v] }));
    };
    const setBrand = (v: string[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, brand: v }));
    };
    const setCategory = (v: string[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, categorySpec: v }));
    };
    const setSizeArray = (v: string[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, sizeArray: v }));
    };
    const setIntl = (v: string[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, intl: v }));
    };
    const setPrice = (v: number[]) => {
        setQueryMeta((queryMeta) => ({ ...queryMeta, price: v }));
    };

    useEffect(() => {
        const filterUpdated = !(JSON.stringify(queryMeta) == JSON.stringify(filterValue));
        const adooptFilter = (queryMeta: filterMetaProps) => {
            const queryParams = Object.entries(queryMeta).filter((obj, idx) => obj[1].length > 0);
            const query = new URLSearchParams(queryParams as any).toString();
            router.push(`\?${query}`);
        };

        filterUpdated && adooptFilter(queryMeta);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryMeta]);

    const result: useProductFilterProps = {
        sortByElement: OptionArraySortBy(queryMeta.sortBy, setSortBy),
        brandElement: OptionArrayWithoutBox(queryMeta.brand, initFilterMeta.brand, setBrand),
        categoryElement: OptionArraySelected(queryMeta.categorySpec, productType, setCategory),
        sizeElement: OptionArraySelected(queryMeta.sizeArray, sizeArray, setSizeArray),
        intlElement: OptionArrayWithoutBox(queryMeta.intl, initFilterMeta.intl, setIntl),
        priceElement: Slider(queryMeta.price, initFilterMeta.price, setPrice),
    };

    return result;
};

export default useProductFilter;
