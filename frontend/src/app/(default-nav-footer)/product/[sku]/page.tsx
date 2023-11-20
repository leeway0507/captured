import Product from "./main";

export default function Page({
    params,
    searchParams,
}: {
    params: { sku: string };
    searchParams: { [key: string]: string | undefined };
}) {
    return <Product sku={params.sku} />;
}
