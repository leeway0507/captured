"use client";
import { ShoppingCartProvider } from "./shopping-cart-context";
import NextAuthProvider from "./next-auth-provider";
import { ReactNode } from "react";

export default function ContextWrapper({ children }: { children: ReactNode }) {
    return (
        <NextAuthProvider>
            <ShoppingCartProvider>{children}</ShoppingCartProvider>
        </NextAuthProvider>
    );
}
