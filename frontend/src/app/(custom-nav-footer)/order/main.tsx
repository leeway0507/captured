"use client";

import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { userAddressProps } from "../../type";
import { User } from "@/app/type";
import { redirect } from "next/navigation";
import useMobile from "@/app/components/hook/use-mobile";
import PageLoading from "@/app/components/loading/page-loading";

export default function Main({ addressArray, userInfo }: { addressArray: userAddressProps[]; userInfo: User }) {
    const { cartItems } = useShoppingCart();
    const { isMobile } = useMobile();

    if (cartItems === undefined) return PageLoading();

    if (cartItems.length === 0) redirect("/cart");
    return (
        <>
            {isMobile ? (
                <MainMobile arr={cartItems} addressArray={addressArray} userInfo={userInfo} />
            ) : (
                <MainPc arr={cartItems} addressArray={addressArray} userInfo={userInfo} />
            )}
        </>
    );
}
