"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPC from "./main-pc";
import PageLoading from "../../components/loading/page-loading";
import Footer from "@/app/components/nav-footer/component/footer";
import { BottomNavBar } from "@/app/components/nav-footer/bottom-nav-bar";

export default function Cart() {
    const { cartItems } = useShoppingCart();

    if (cartItems === undefined) return <PageLoading />;
    return (
        <>
            <>
                <MainMobile arr={cartItems} />
                <BottomNavBar nav="cart" />
            </>
            <div className="hidden tb:block px-2">
                <MainPC arr={cartItems} />
            </div>
            <Footer />
        </>
    );
}
