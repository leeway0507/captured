import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import Product from "./main";

export default function Page({
    params,
    searchParams,
}: {
    params: { sku: string };
    searchParams: { [key: string]: string | undefined };
}) {
    console.log(params);
    console.log(searchParams);

    return (
        <>
            <NavFooter>
                <Product sku={params.sku} />
            </NavFooter>
        </>
    );
}
