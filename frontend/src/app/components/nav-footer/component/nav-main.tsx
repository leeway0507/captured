"use client";
import NavMobile from "./nav-mobile";
import NavPc from "./nav-pc";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import PageLoading from "../../loading/page-loading";

export default function NavMain() {
    const { isMobile } = useShoppingCart();

    if (isMobile === undefined) return <PageLoading />;

    return <>{isMobile ? <NavMobile /> : <NavPc />}</>;
}
