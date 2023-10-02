"use client";
import NavFooter from "@/app/components/nav-footer/nav-footer";
import EmailVerification from "./main";
import { useShoppingCart } from "@/app/shopping-cart-context";

export default function Page() {
    return (
        <>
            <NavFooter>
                <EmailVerification />
            </NavFooter>
        </>
    );
}
