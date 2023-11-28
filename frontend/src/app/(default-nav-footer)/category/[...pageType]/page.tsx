import * as api from "./component/fetch";
import CategoryFilter from "./cateogry-filter";
import { filterRequestProps } from "./type";
import { responseProps } from "./component/fetch";
import ProductCardArrary from "./component/product-card/product-card-array";
import { BottomNavBar } from "@/app/components/nav-footer/component/bottom-nav-bar";
import Footer from "@/app/components/nav-footer/component/footer";

function createFilterValue(filterParams: any) {
    const filter = new URLSearchParams(filterParams);
    const filterValue: { [key: string]: string[] } = {};

    filter.forEach((value, key) => {
        filterValue[key] = value.split(",");
    });
    return filterValue;
}

function addCategoryFilterToFilterDict(pageType: string[], filterMeta: filterRequestProps) {
    switch (pageType[0]) {
        case "clothing":
            return (filterMeta.category = "의류");
        case "shoes":
            return (filterMeta.category = "신발");
        case "accessory":
            return (filterMeta.category = "기타");
    }
}

export default async function page({ searchParams, params }: { params: { pageType: string[] }; searchParams: any }) {
    const initFilterMeta = await api.getFilterMetaProxy();

    const { isNewFilter, page, ...filterParams } = searchParams;
    const { pageType } = params;

    const filterDict: filterRequestProps = filterParams;
    addCategoryFilterToFilterDict(pageType, filterDict);
    const res: responseProps = await api.getCategory(filterDict, page || 1);

    const filterValue: { [key: string]: string[] } = createFilterValue(filterParams);

    return (
        <>
            <CategoryFilter initFilterMeta={initFilterMeta} pageType={pageType} filterValue={filterValue}>
                {res.lastPage === 0 ? (
                    <div className="flex flex-col mx-auto h-full tb:p-16 ">
                        <div className="text-xl tb:text-3xl pb-2 m-auto">요청 결과가 존재하지 않습니다.</div>
                    </div>
                ) : (
                    <ProductCardArrary
                        data={res.data}
                        currentPage={res.currentPage}
                        lastPage={res.lastPage}
                        isNewFilter={isNewFilter}
                    />
                )}
            </CategoryFilter>
            <Footer />
            <BottomNavBar nav="shop" />
        </>
    );
}
