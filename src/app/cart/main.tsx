"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPC from "./main-pc";
import { cartProductCardProps, productCardProps } from "../type";
import { useEffect, useState } from "react";

export default function Cart() {
    const { cartItems, isMobile, isLoading } = useShoppingCart();
    const [data, setData] = useState<cartProductCardProps[]>([]);

    useEffect(() => {
        const CartItemArr = cartItems
            ?.map((item) => {
                const product = localStorage.getItem(item.sku.toString());
                if (product) return { ...JSON.parse(product), size: item.size, quantity: item.quantity };
            })
            .filter((item): item is cartProductCardProps => Boolean(item));
        setData(CartItemArr);
    }, [cartItems]);

    if (isLoading) return null;

    return (
        <>
            {isMobile ? (
                <div className="">
                    <MainMobile arr={data} />
                </div>
            ) : (
                <div className="px-5">
                    <MainPC arr={data} />
                </div>
            )}
        </>
    );
}
