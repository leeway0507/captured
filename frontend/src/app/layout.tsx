import "./globals.css";
import type { Metadata } from "next";
import { Monda, Carter_One } from "next/font/google";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const monda = Monda({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Captured",
    description: "We capture reasonalble products around the world.",
    viewport: "width=device-width, maximum-scale=1, user-scalable=0",
};

const carterOne = Carter_One({ weight: ["400"], subsets: ["latin"], variable: "--test" });

// rowides Archivo_Black Black_Ops_One, Dela_Gothic_One Righteous,Carter_One

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="kr">
            <body className={`${monda.className} ${carterOne.variable}`}>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    transition={Flip}
                    toastClassName="text-lg shadow-lg top-20"
                />
            </body>
        </html>
    );
}
