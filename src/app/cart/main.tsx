"use client";
import { useShoppingCart } from "../shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPC from "./main-pc";
import { cartProductCardProps, productCardProps } from "../type";
import { Suspense } from "react";
import PageLoading from "../components/loading/page-loading";

export default function Cart() {
    const { mockDB, cartItems, isMobile } = useShoppingCart();

    const CartItemArr = cartItems
        ?.map((item) => {
            const product = mockDB.find((product) => product.sku === item.id);
            if (product) return { ...product, size: item.size, quantity: item.quantity };
        })
        .filter((item): item is cartProductCardProps => Boolean(item));

    if (!CartItemArr) return <PageLoading />;

    return (
        <>
            {isMobile ? (
                <div className="">
                    <MainMobile arr={CartItemArr} />
                </div>
            ) : (
                <div className="px-5">
                    <MainPC arr={CartItemArr} />
                </div>
            )}
        </>
    );
}
