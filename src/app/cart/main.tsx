"use client";
import { useShoppingCart } from "../shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPC from "./main-pc";
import { cartProductCardProps, productCardProps } from "../type";
import { useEffect, useState } from "react";

export default function Cart() {
    const { mockDB, cartItems } = useShoppingCart();

    const CartItemArr = cartItems
        .map((item) => {
            const product = mockDB.find((product) => product.id === item.id);
            if (product) return { ...product, size: item.size, quantity: item.quantity };
        })
        .filter((item): item is cartProductCardProps => Boolean(item));

    return (
        <>
            <>
                <div className="tb:hidden">
                    <MainMobile arr={CartItemArr} />
                </div>
                <div className="hidden tb:block">
                    <MainPC arr={CartItemArr} />
                </div>
            </>
        </>
    );
}
