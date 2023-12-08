import Client from "./client";
import MainPc from "./main-pc";
import MainMobile from "./main-mobile";
import { productCardProps } from "@/app/type";
import { getProduct } from "./component/fetch";
import { getFilterMetaProxy } from "@/app/(default-nav-footer)/category/[...pageType]/component/fetch";
import { categorySpec } from "@/app/(default-nav-footer)/category/[...pageType]/type";
import { redirect } from "next/navigation";

export default async function Product({
    params,
    searchParams,
}: {
    params: { sku: string };
    searchParams: { [key: string]: string | undefined };
}) {
    const res = await getProduct(params.sku);

    const product: productCardProps = res.data;
    const filterMeta = await getFilterMetaProxy();
    const defaultSizeArr = filterMeta["category"][product.category as keyof categorySpec]?.["sizeArray"];

    return (
        <>
            <Client
                Mobile={<MainMobile product={product} defaultSizeArr={defaultSizeArr} />}
                Pc={<MainPc product={product} defaultSizeArr={defaultSizeArr} />}
                data={product}
            />
        </>
    );
}
