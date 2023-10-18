"use client";

import { useSession } from "next-auth/react";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";

export default function Main({ orderHistory }: { orderHistory: JSX.Element }) {
    const { data: session, status } = useSession();
    const { isMobile } = useShoppingCart();

    return isMobile ? (
        <MainMobile signUpType={session?.user.signUpType!} orderHistory={orderHistory} />
    ) : (
        <MainPc signUpType={session?.user.signUpType!} orderHistory={orderHistory} />
    );
}
