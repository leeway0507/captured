import Footer from "@/app/components/nav-footer/component/footer";

import RelatedProducts from "../../product/[sku]/component/recent-view-products";
import createSearchInitFilterMeta from "./search-init-filter-meta";
import Main from "./main";
import { searchItems } from "../fetch";
import { BottomNavBar } from "@/app/components/nav-footer/component/bottom-nav-bar";

export default async function Page({ params }: { params: { keyword: string } }) {
    const { keyword } = params;
    const decodedKeyword = decodeURI(keyword);
    const keywordResult = decodedKeyword!.length > 30 ? decodedKeyword!.slice(0, 30) + "..." : decodedKeyword;

    const result = await searchItems(keyword);
    const resultData = result.data;
    const initFilterMeta = createSearchInitFilterMeta(resultData);

    return (
        <div className="pt-4 px-2 min-h-screen">
            {resultData.length === 0 ? (
                <>
                    <div className="text-center tb:text-2xl xl:text-3xl pb-20">
                        {keywordResult}에 대한 검색 결과가 없습니다.
                    </div>
                    <RelatedProducts />
                </>
            ) : (
                <div className="w-full">
                    <div className="text-center text-xl pb-4 tb:pb-8">{keywordResult}에 대한 검색 결과</div>
                    <Main initFilterMeta={initFilterMeta} resultData={resultData} />
                    <div className="pt-4 hidden tb:block">
                        <Footer />
                    </div>
                    <div className="pt-4 tb:hidden">
                        <BottomNavBar nav="none" />
                    </div>
                </div>
            )}
        </div>
    );
}
