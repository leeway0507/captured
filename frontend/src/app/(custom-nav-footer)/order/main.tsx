"use client";

import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { userAddressProps } from "../../type";
import PageLoading from "@/app/components/loading/page-loading";
import { User } from "@/app/type";
import { redirect } from "next/navigation";

export default function Main({ addressArray, userInfo }: { addressArray: userAddressProps[]; userInfo: User }) {
    const { isMobile, cartItems } = useShoppingCart();

    if (cartItems === undefined) return <PageLoading />;

    console.log(cartItems, cartItems.length);
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
