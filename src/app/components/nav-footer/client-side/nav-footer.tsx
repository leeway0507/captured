"use client";
import Footer from "../component/footer";
import { ShoppingCartProvider } from "@/app/components/context/shopping-cart-context";
import { SessionProvider } from "next-auth/react";
import NavMain from "../component/nav-main";

interface NavFooterProps {
    children: React.ReactNode;
}

export default function NavFooter({ children }: NavFooterProps) {
    return (
        <SessionProvider>
            <ShoppingCartProvider>
                <main className="custom-container">
                    <NavMain />
                    <div className="grow">{children}</div>
                    <Footer />
                </main>
            </ShoppingCartProvider>
        </SessionProvider>
    );
}
