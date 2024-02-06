import * as api from "./component/fetch";
import CategoryFilter from "./cateogry-filter";
import InfiniteCardArray from "./component/infinite-scroll/infinite-card-array";
import { BottomNavBar } from "@/app/components/nav-footer/component/bottom-nav-bar";
import Footer from "@/app/components/nav-footer/component/footer";

export default async function page({ searchParams, params }: { params: { pageType: string[] }; searchParams: any }) {
    // 필터 변동사항 아래 json에 업데이트
    //main/frontend/src/app/api/get-filter-meta/init_meta.json
    //admin/frontend/src/app/env.json
    const initFilterMeta = await api.getFilterMetaProxy();

    const { page, ...filterParams } = searchParams;
    const { pageType } = params;

    const filterValue: { [key: string]: string[] } = createFilterValue(filterParams);

    return (
        <>
            <CategoryFilter initFilterMeta={initFilterMeta} pageType={pageType} filterValue={filterValue}>
                <InfiniteCardArray />
            </CategoryFilter>
            <Footer />
            <BottomNavBar nav="shop" />
        </>
    );
}

function createFilterValue(filterParams: any) {
    const filter = new URLSearchParams(filterParams);
    const filterValue: { [key: string]: string[] } = {};

    filter.forEach((value, key) => {
        filterValue[key] = value.split(",");
    });

    return filterValue;
}
