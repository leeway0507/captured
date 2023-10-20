"use client";

import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { cartItemProps, cartProductCardProps, userAddressProps } from "../type";
import { useSession } from "next-auth/react";
import PageLoading from "@/app/components/loading/page-loading";
import { useEffect, useState } from "react";

const getCartDataFromLocalStorage = (cartItems: cartItemProps[]) => {
    const result = cartItems
        ?.map((item) => {
            const product = localStorage.getItem(item.sku.toString());
            if (product) return { ...JSON.parse(product), size: item.size, quantity: item.quantity };
        })
        .filter((item): item is cartProductCardProps => Boolean(item));
    return result;
};

export default function Main({ addressArray }: { addressArray: userAddressProps[] }) {
    const { isMobile, cartItems } = useShoppingCart();
    const { data: session } = useSession();

    const [data, setData] = useState<cartProductCardProps[] | undefined>(undefined);

    useEffect(() => {
        setData(getCartDataFromLocalStorage(cartItems));
    }, [cartItems]);

    if (data === undefined) return <PageLoading />;

    return (
        <>
            {isMobile ? (
                <MainMobile arr={data} accessToken={session?.user.accessToken!} addressArray={addressArray} />
            ) : (
                <MainPc arr={data} accessToken={session?.user.accessToken!} addressArray={addressArray} />
            )}
        </>
    );
}
