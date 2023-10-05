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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="kr">
            <head></head>
            <body className={`${monda.className} ${mondaL.variable}`}>{children}</body>
        </html>
    );
}
