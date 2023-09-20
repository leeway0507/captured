"use client";
import NavFooter from "../../components/nav-footer/nav-footer";
import EmailVerification from "./main";
import { useShoppingCart } from "../../shopping-cart-context";

export default function Page() {
    return (
        <>
            <NavFooter>
                <EmailVerification />
            </NavFooter>
        </>
    );
}
