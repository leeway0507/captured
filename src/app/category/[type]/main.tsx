import { Suspense } from "react";

import { getInitCategory, getFilteredCategoryTest } from "./component/fetch";
import CateogryClient from "./client";
import { filterMetaProps } from "./type";
import { responseProps } from "./component/fetch";
import ProductCardArrary from "./component/product-card-array";

export const Main = async ({ filter, page }: { filter: filterMetaProps | undefined; page: string | undefined }) => {
    const response: responseProps = page ? await getFilteredCategoryTest(filter, page) : await getInitCategory();
    const data = response.data;
    const meta = response.meta;
    const currentPage = response.currentPage;
    const lastPage = response.lastPage;

    console.log("현재페이지 =", page);
    console.log(data.map((props) => props.sku));

    return (
        <CateogryClient data={data} meta={meta}>
            <Suspense fallback={<div>Suspense Loading.....</div>}>
                <ProductCardArrary data={data} currentPage={currentPage} lastPage={lastPage} />
            </Suspense>
        </CateogryClient>
    );
};
