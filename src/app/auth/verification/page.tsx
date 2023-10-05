"use client";
import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import EmailVerification from "./main";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
export default function Page() {
    return (
        <>
            <NavFooter>
                <EmailVerification />
            </NavFooter>
        </>
    );
}
