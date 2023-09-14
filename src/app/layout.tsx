import "./globals.css";
import type { Metadata } from "next";
import { Monda } from "next/font/google";

const monda = Monda({ weight: ["700"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Captured",
    description: "We capture reasonalble products around world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="kr">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body className={monda.className}>{children}</body>
        </html>
    );
}
