"use client";
import { MobileFilterPage } from "../../category/[...pageType]/component/filter/mobile-filter";
import PcFilter from "../../category/[...pageType]/component/filter/pc-filter";
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
            <div className={`h-[50px] bg-light-gray tb:hidden `}>
                <MobileFilterPage productFilter={productFilter} pageType={pageType} />
            </div>
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
        <div className="flex flex-col tb:flex-row justify-between w-full px-2 tb:gap-8 tb:px-4 ">
            <div className="tb:basis-1/3 lg:basis-1/4 sticky top-[50px] tb:mb-4 tb:top-[80px] bg-white z-10 tb:z-0">
                <FilterPage initFilterMeta={initFilterMeta} pageType={pageType} filterValue={filterValue} />
            </div>

            <div className={`w-full flex-grow tb:block tb:basis-2/3 lg:basis-3/4`}>{children}</div>
        </div>
    );
}
