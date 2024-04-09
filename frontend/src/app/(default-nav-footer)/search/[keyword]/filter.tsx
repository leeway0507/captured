"use client";
import FilterLayOut from "../../category/[...pageType]/component/filter/filter-layout";
import { initFilterMetaProps, filterMetaProps } from "../../category/[...pageType]/type";
import useProductFilter, {
    useProductFilterProps,
} from "../../category/[...pageType]/component/filter/hook/use-product-filter";

const FilterPage = ({
    initFilterMeta,
    pageType,
    filterValue,
}: {
    initFilterMeta: initFilterMetaProps;
    pageType: string;
    filterValue: filterMetaProps;
}) => {
    const productFilter: useProductFilterProps | null = useProductFilter(initFilterMeta, pageType, filterValue);
    return (
        <>
            <FilterLayOut productFilter={productFilter} pageType={pageType} />
        </>
    );
};

export default function SearchFilter({
    children,
    initFilterMeta,
    pageType,
    filterValue,
}: {
    children: React.ReactNode;
    initFilterMeta: initFilterMetaProps;
    pageType: string;
    filterValue: filterMetaProps;
}) {
    return (
        <div className="flex flex-col justify-between w-full px-2 tb:gap-8 tb:px-4 ">
            <div className="sticky top-[50px] tb:mb-4 bg-white z-10">
                <FilterPage initFilterMeta={initFilterMeta} pageType={pageType} filterValue={filterValue} />
            </div>

            <div className={`w-full flex-grow tb:block tb:basis-2/3 lg:basis-3/4`}>{children}</div>
        </div>
    );
}
