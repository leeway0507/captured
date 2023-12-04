"use client";

import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { userAddressProps } from "../../type";
import { User } from "@/app/type";
import { redirect } from "next/navigation";
import useMobile from "@/app/components/hook/use-mobile";
import PageLoading from "@/app/components/loading/page-loading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cartProductCardProps } from "../../type";

export default function Main({ addressArray, userInfo }: { addressArray: userAddressProps[]; userInfo: User }) {
    const { cartItems } = useShoppingCart();
    const { isMobile } = useMobile();
    const params = useSearchParams();
    const [order, setOrder] = useState<cartProductCardProps[]>();

    useEffect(() => {
        if (params.get("order") === "All") {
            setOrder(cartItems);
        } else {
            setOrder(cartItems?.filter((item) => item.selected === true));
        }
    }, [cartItems, params]);

    if (order === undefined) return PageLoading();
    if (cartItems!.length === 0) redirect("/cart");
    if (order?.length === 0) redirect("/cart");
    return (
        <>
            {isMobile ? (
                <MainMobile arr={order!} addressArray={addressArray} userInfo={userInfo} />
            ) : (
                <MainPc arr={order!} addressArray={addressArray} userInfo={userInfo} />
            )}
        </>
    );
}
