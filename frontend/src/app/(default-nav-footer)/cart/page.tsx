"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPC from "./main-pc";
import Footer from "@/app/components/nav-footer/component/footer";
import { BottomNavBar } from "@/app/components/nav-footer/component/bottom-nav-bar";
import PageLoading from "@/app/components/loading/page-loading";
import useMobile from "@/app/components/hook/use-mobile";

export default function Cart() {
    const { cartItems } = useShoppingCart();
    const { isMobile } = useMobile();
    if (cartItems === undefined) return PageLoading();
    return (
        <>
            {isMobile ? (
                <>
                    <MainMobile />
                    <BottomNavBar nav="cart" />
                </>
            ) : (
                <div className="hidden tb:block px-2">
                    <MainPC />
                    <Footer />
                </div>
            )}
        </>
    );
}
