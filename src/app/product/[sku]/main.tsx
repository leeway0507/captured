import Client from "./client";
import MainPc from "./main-pc";
import MainMobile from "./main-mobile";
import { productCardProps } from "@/app/type";
import { getProduct } from "./component/fetch";

export default async function Product({ sku }: { sku: string }) {
    const product = await getProduct(sku);

    return <Client Mobile={<MainMobile {...product} />} Pc={<MainPc {...product} />} />;
}
