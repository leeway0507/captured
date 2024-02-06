"use client";
import PcFilter from "./component/filter/pc-filter";
import MobileFilter from "./component/filter/mobile-filter";
import { initFilterMetaProps, filterMetaProps } from "./type";
import useProductFilter, { useProductFilterProps } from "./component/filter/hook/use-product-filter";

export default function CateogryFilter({
    children,
    filterValue,
    initFilterMeta,
    pageType,
}: {
    children: React.ReactNode;
    filterValue: filterMetaProps;
    initFilterMeta: initFilterMetaProps;
    pageType: string[];
}) {
    return (
        <div className="main-frame tb:flex-row justify-between px-2 tb:gap-8 tb:px-4 ">
            <div className="tb:basis-1/3 lg:basis-1/4 sticky top-[50px] tb:mb-4 tb:top-[80px] bg-white z-10 tb:z-0">
                <FilterPage initFilterMeta={initFilterMeta} pageType={pageType[0]} filterValue={filterValue} />
            </div>
            <div className={`w-full flex-grow tb:block tb:basis-2/3 lg:basis-3/4`}>{children}</div>
        </div>
    );
}

function FilterPage({
    initFilterMeta,
    pageType,
    filterValue,
}: {
    initFilterMeta: initFilterMetaProps;
    pageType: string; // "shoes" | "clothing" | "accessory" | "all"
    filterValue: filterMetaProps;
}) {
    // const productFilter = useProductFilter(initFilterMeta, pageType, filterDict);
    const productFilter: useProductFilterProps | null = useProductFilter(initFilterMeta, pageType, filterValue);
    if (productFilter === null) return <></>;
    return (
        <>
            <MobileFilter productFilter={productFilter} pageType={pageType} />
            <div className="hidden tb:block tb:sticky tb:top-[80px] tb:z-10">
                <PcFilter
                    initFilterMeta={initFilterMeta}
                    productFilter={productFilter}
                    isOpen={true}
                    pageType={pageType}
                />
            </div>
        </>
    );
}
