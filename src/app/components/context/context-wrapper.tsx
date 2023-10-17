"use client";
import { ShoppingCartProvider } from "./shopping-cart-context";
import NextAuthProvider from "./next-auth-provider";
import { ReactNode } from "react";
import { useEffect, useState } from "react";

export default function ContextWrapper({ children }: { children: ReactNode }) {
    const [size, setSize] = useState(0);
    //experiemental
    useEffect(() => {
        const handleResize = () => {
            setSize(window.scrollY);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size > 100) {
            console.log("size");
            console.log(size);
        } else {
            console.log("size");
        }
    }, [size]);
    return (
        <NextAuthProvider>
            <ShoppingCartProvider>{children}</ShoppingCartProvider>
        </NextAuthProvider>
    );
}
