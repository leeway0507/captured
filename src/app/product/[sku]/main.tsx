import Client from "./client";
import MainPc from "./main-pc";
import MainMobile from "./main-mobile";
import { productCardProps } from "@/app/type";
import { getProduct } from "./component/fetch";
import { getFilterMeta } from "@/app/category/[...pageType]/component/fetch";
import { categorySpec } from "@/app/category/[...pageType]/type";

export default async function Product({ sku }: { sku: string }) {
    const product: productCardProps = await getProduct(sku);
    const filterMeta = await getFilterMeta();
    const defaultSizeArr = filterMeta["category"][product.category as keyof categorySpec]?.["sizeArray"];

    return (
        <Client
            Mobile={<MainMobile product={product} defaultSizeArr={defaultSizeArr} />}
            Pc={<MainPc product={product} defaultSizeArr={defaultSizeArr} />}
        />
    );
}
