"use client";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useShoppingCart } from "../shopping-cart-context";
import MobileMain from "./main-mobile";
import MobilePc from "./main-pc";
import SignInAlertModal from "../components/modal/signin-alert-modal-without-btn";
import PageLoading from "../components/loading/page-loading";

export default function Main() {
    const { data: session, status } = useSession();

    const { isMobile } = useShoppingCart();

    console.log("session", session);

    if (session === undefined) return <PageLoading />;

    return <>{session === null ? <SignInAlertModal /> : isMobile ? <MobileMain /> : <MobilePc />}</>;
}
