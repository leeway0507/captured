"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPC from "./main-pc";
import PageLoading from "../../components/loading/page-loading";

export default function Cart() {
    const { cartItems, isMobile } = useShoppingCart();

    if (cartItems === undefined) return <PageLoading />;
    return (
        <>
            {isMobile ? (
                <div className="">
                    <MainMobile arr={cartItems} />
                </div>
            ) : (
                <div className="px-2">
                    <MainPC arr={cartItems} />
                </div>
            )}
        </>
    );
}
