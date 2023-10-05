"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import Image from "next/image";
import Link from "next/link";
import CartBtn from "./cart-btn";

export default function NavMobile() {
    const { navOpen, setNavOpen, cartQuantity } = useShoppingCart();
    const navOpenToggle = () => {
        setNavOpen(!navOpen);
    };

    return (
        <>
            <header className="sticky bg-white h-[100px] left-0 top-0 flex flex-row p-4 justify-between shadow-sm shadow-gray-200 z-50 w-100">
                <div className="flex-left basis-2/12">
                    {navOpen ? (
                        <Image src="/icons/close.svg" alt="close" width={24} height={24} />
                    ) : (
                        <div className="w-full h-full flex-left" onClick={navOpenToggle}>
                            <Image src="/icons/list.svg" alt="list" width={40} height={40} />
                        </div>
                    )}
                </div>

                <div className="flex-center basis-8/12">
                    <Link href="/">
                        <Image src="/icons/main-logo.svg" alt="main logo" width={160} height={36} />
                    </Link>
                </div>
                <div className="flex-right basis-2/12">
                    <CartBtn />
                </div>
            </header>
        </>
    );
}
