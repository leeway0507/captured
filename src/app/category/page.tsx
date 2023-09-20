"use client";
import NavFooter from "../components/nav-footer/nav-footer";
import Category from "./main";
import { useShoppingCart } from "../shopping-cart-context";

export default function Page() {
    return (
        <>
            <NavFooter>
                <Category />
            </NavFooter>
        </>
    );
}