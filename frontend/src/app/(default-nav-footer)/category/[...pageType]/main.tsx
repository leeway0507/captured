import * as api from "./component/fetch";
import CateogryClient from "./client";
import { filterRequestProps } from "./type";
import { responseProps } from "./component/fetch";
import ProductCardArrary from "./component/product-card/product-card-array";
import Image from "next/image";
function addCategoryFilterToFilterDict(pageType: string[], filterMeta: filterRequestProps) {
    switch (pageType[0]) {
        case "clothing":
            return (filterMeta.category = "의류");
        case "shoes":
            return (filterMeta.category = "신발");
        case "accessory":
            return (filterMeta.category = "기타");
        case "brand":
            return (filterMeta.brand = pageType[1].replace("-", " "));
    }
}

export const Main = async ({ searchParams, params }: { params: { pageType: string[] }; searchParams: any }) => {
    const initFilterMeta = await api.getFilterMeta();

    const { refresh, page, ...filterMeta } = searchParams;
    const { pageType } = params;

    const filterDict: filterRequestProps = filterMeta;
    addCategoryFilterToFilterDict(pageType, filterDict);
    const res: responseProps = await api.getCategory(filterDict, page || 1);

    return (
        <CateogryClient initFilterMeta={initFilterMeta} pageType={pageType}>
            {res.lastPage === 0 ? (
                <div className="flex flex-col mx-auto h-full tb:p-16 ">
                    <div className="text-xl tb:text-3xl pb-2 m-auto">요청 결과가 존재하지 않습니다.</div>
                </div>
            ) : (
                <ProductCardArrary
                    data={res.data}
                    currentPage={res.currentPage}
                    lastPage={res.lastPage}
                    refresh={refresh}
                />
            )}
        </CateogryClient>
    );
};
