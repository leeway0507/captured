import { Suspense } from "react";

import * as api from "./component/fetch";
import CateogryClient from "./client";
import { filterMetaProps, filterRequestProps } from "./type";
import { responseProps } from "./component/fetch";
import ProductCardArrary from "./component/product-card-array";

function addDefaultCategoryFilter(pageType: string[], filterMeta: filterRequestProps) {
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

    const filter = filterMeta as filterRequestProps;

    addDefaultCategoryFilter(pageType, filter);

    const res: responseProps = await api.getCategory(filter, page || 1);

    return (
        <CateogryClient data={res.data} initFilterMeta={initFilterMeta} pageType={pageType}>
            <Suspense fallback={<div>Suspense Loading.....</div>}>
                {res.lastPage === 0 ? (
                    <>
                        <div>{filter?.brand}</div>
                        <div>{filter?.category}</div>
                        <div>{filter?.intl}</div>
                        <div>{filter?.price}</div>
                        <div>{filter?.sizeArray}</div>
                        <div>{filter?.sortBy}</div>
                    </>
                ) : (
                    <ProductCardArrary
                        data={res.data}
                        currentPage={res.currentPage}
                        lastPage={res.lastPage}
                        refresh={refresh}
                    />
                )}
            </Suspense>
        </CateogryClient>
    );
};
