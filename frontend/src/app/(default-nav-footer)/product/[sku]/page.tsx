import Product from "./main";
import { BottomNavBar } from "@/app/components/nav-footer/bottom-nav-bar";

export default function Page({
    params,
    searchParams,
}: {
    params: { sku: string };
    searchParams: { [key: string]: string | undefined };
}) {
    return (
        <>
            <Product sku={params.sku} />
            <BottomNavBar nav="none" />
        </>
    );
}
