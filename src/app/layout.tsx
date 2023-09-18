import "./globals.css";
import type { Metadata } from "next";
import { Monda } from "next/font/google";
import { ShoppingCartProvider } from "./shopping-cart-context";

const monda = Monda({ weight: ["700"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Captured",
    description: "We capture reasonalble products around world.",
};
const mondaL = Monda({
    weight: "400",
    subsets: ["latin"],
    variable: "--Monda-L",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="kr">
            <head></head>
            <ShoppingCartProvider>
                <body className={`${monda.className} ${mondaL.variable}`}>{children}</body>
            </ShoppingCartProvider>
        </html>
    );
}
