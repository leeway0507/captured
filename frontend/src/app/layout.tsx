import "./globals.css";
import type { Metadata } from "next";
import { Monda, Carter_One, Fugaz_One } from "next/font/google";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const monda = Monda({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Captured",
    description: "We capture reasonalble products around the world.",
    viewport: "width=device-width, maximum-scale=1, user-scalable=0",
};

const carterOne = Fugaz_One({ weight: ["400"], subsets: ["latin"], variable: "--test" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="kr">
            <body className={`${monda.className} ${carterOne.variable}`}>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    transition={Flip}
                    toastClassName="text-lg shadow-lg top-[50px]"
                />
            </body>
        </html>
    );
}
