"use client";
import { ShoppingCartProvider } from "@/app/components/context/shopping-cart-context";
import NextAuthProvider from "../../context/next-auth-provider";
import NavMain from "../component/nav-main";

export default function NavServer() {
    return (
        <NextAuthProvider>
            <ShoppingCartProvider>
                <NavMain />
            </ShoppingCartProvider>
        </NextAuthProvider>
    );
}
