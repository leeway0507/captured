"use client";
import NavFooter from "../components/nav-footer/nav-footer";
import Product from "./main";
import { useShoppingCart } from "../shopping-cart-context";

export default function Page() {
    return (
        <>
            <NavFooter>
                <Product />
            </NavFooter>
        </>
    );
}
