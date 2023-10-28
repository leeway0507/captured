"use client";

import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { cartItemProps, cartProductCardProps, userAddressProps } from "../type";
import { useSession } from "next-auth/react";
import PageLoading from "@/app/components/loading/page-loading";
import { useEffect, useState } from "react";

export default function Main({ addressArray }: { addressArray: userAddressProps[] }) {
    const { isMobile, cartItems } = useShoppingCart();
    const { data: session } = useSession();

    if (cartItems === undefined) return <PageLoading />;

    return (
        <>
            {isMobile ? (
                <MainMobile arr={cartItems} accessToken={session?.user.accessToken!} addressArray={addressArray} />
            ) : (
                <MainPc arr={cartItems} accessToken={session?.user.accessToken!} addressArray={addressArray} />
            )}
        </>
    );
}
