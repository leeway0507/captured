"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPC from "./main-pc";
import PageLoading from "../../components/loading/page-loading";
import Footer from "@/app/components/nav-footer/component/footer";

export default function Cart() {
    const { cartItems } = useShoppingCart();

    if (cartItems === undefined) return <PageLoading />;
    return (
        <>
            <>
                <MainMobile arr={cartItems} />
            </>
            <div className="hidden tb:block px-2">
                <MainPC arr={cartItems} />
                <Footer />
            </div>
        </>
    );
}
