"use client";

import { useSession } from "next-auth/react";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import SignInAlertModal from "../components/modal/signin-alert-modal-without-btn";
import PageLoading from "../components/loading/page-loading";

export default function Main({ orderHistory }: { orderHistory: JSX.Element }) {
    const { data: session, status } = useSession();
    const { isMobile, cartItems } = useShoppingCart();

    if (status === "unauthenticated") {
        return <SignInAlertModal />;
    }

    if (status === "loading") {
        return <PageLoading />;
    }

    return (
        <>
            {isMobile ? (
                <MainMobile signUpType={session?.user.signUpType!} orderHistory={orderHistory} />
            ) : (
                <MainPc orderHistory={orderHistory} />
            )}
        </>
    );
}
