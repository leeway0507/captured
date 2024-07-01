import * as api from "./component/fetch";
import Main from "./main";
import { BottomNavBar } from "@/app/components/nav-footer/component/bottom-nav-bar";
import Footer from "@/app/components/nav-footer/component/footer";

export default async function page({ searchParams, params }: { params: { pageType: string[] }; searchParams: any }) {
    // 필터 변동사항 아래 json에 업데이트
    //main/frontend/src/app/api/get-filter-meta/init_meta.json
    //admin/frontend/src/app/env.json
    const initFilterMeta = await api.getFilterMetaProxy();

    const { page, ...filterParams } = searchParams;
    const { pageType } = params;



    return (
        <>
            <Main initFilterMeta={initFilterMeta} filterParams={filterParams} pageType={pageType} />
            <Footer />
            <BottomNavBar nav="shop" />
        </>
    );
}
