"use client";

import { useSession } from "next-auth/react";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MobileMain from "./main-mobile";
import MobilePc from "./main-pc";
import SignInAlertModal from "../components/modal/signin-alert-modal-without-btn";
import PageLoading from "../components/loading/page-loading";

export default function Main() {
    const { data: session, status } = useSession();
    const { isMobile } = useShoppingCart();

    if (status === "unauthenticated") {
        return <SignInAlertModal />;
    }

    if (status === "loading") {
        return <PageLoading />;
    }

    return <>{isMobile ? <MobileMain /> : <MobilePc />}</>;
}
