import "./globals.css";
import type { Metadata } from "next";
import { Monda } from "next/font/google";

const monda = Monda({ weight: ["700"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Captured",
    description: "We capture reasonalble products around the world.",
    viewport: "width=device-width, maximum-scale=1, user-scalable=0",
};
const mondaL = Monda({
    weight: "400",
    subsets: ["latin"],
    variable: "--Monda-L",
});

import { Carter_One } from "next/font/google";
const Alpha = Carter_One({ weight: ["400"], subsets: ["latin"], variable: "--test" });

// rowides Archivo_Black Black_Ops_One, Dela_Gothic_One Righteous,Carter_One

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="kr">
            <body className={`${monda.className} ${mondaL.variable} ${Alpha.variable}`}>{children}</body>
        </html>
    );
}
