import { Suspense } from "react";

import * as api from "./component/fetch";
import CateogryClient from "./client";
import { filterProps } from "./type";
import { responseProps } from "./component/fetch";
import ProductCardArrary from "./component/product-card-array";

export const Main = async (params: any) => {
    const meta = await api.getFilterMeta();
    const { refresh, page, ...filterMeta } = params.params;
    const filter = JSON.stringify(filterMeta) == "{}" ? undefined : (filterMeta as filterProps);

    const response: responseProps = await api.getCategory(filter, page || 1);
    const data = response.data;
    const currentPage = response.currentPage;
    const lastPage = response.lastPage;

    return (
        <CateogryClient data={data} meta={meta}>
            <Suspense fallback={<div>Suspense Loading.....</div>}>
                {lastPage === 0 ? (
                    <>
                        <div>{filter?.brand}</div>
                        <div>{filter?.category}</div>
                        <div>{filter?.intl}</div>
                        <div>{filter?.price}</div>
                        <div>{filter?.sizeArray}</div>
                        <div>{filter?.sortBy}</div>
                    </>
                ) : (
                    <ProductCardArrary data={data} currentPage={currentPage} lastPage={lastPage} refresh={refresh} />
                )}
            </Suspense>
        </CateogryClient>
    );
};
