"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPC from "./main-pc";
import { cartProductCardProps, productCardProps } from "../type";
import { mockDB } from "../api/mock-apis";

export default function Cart() {
    const { cartItems, isMobile } = useShoppingCart();

    const CartItemArr = cartItems
        ?.map((item) => {
            const product = mockDB.find((product) => product.sku === item.id);
            if (product) return { ...product, size: item.size, quantity: item.quantity };
        })
        .filter((item): item is cartProductCardProps => Boolean(item));

    console.log("cartItems", CartItemArr);

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
