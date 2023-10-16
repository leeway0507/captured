"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import Image from "next/image";
import Link from "next/link";
import CartBtn from "./cart-btn";
import UserDropDown from "./user-dropdown";
import { useSession } from "next-auth/react";

export default function NavMobile() {
    const { navOpen, setNavOpen } = useShoppingCart();
    const navOpenToggle = () => {
        setNavOpen(!navOpen);
    };

    const { data: session } = useSession();
    const userIcon = <Image src="/icons/person.svg" alt="person" className="flex-right" width={24} height={24} />;

    return (
        <>
            <header>
                <div className="sticky top-0 h-[100px] w-full m-auto px-4 z-50 bg-white">
                    <div className="flex h-full">
                        <div className="flex-left basis-1/4 z-50">
                            {navOpen ? (
                                <Image src="/icons/close.svg" alt="close" width={24} height={24} />
                            ) : (
                                <div onClick={navOpenToggle}>
                                    <Image src="/icons/list.svg" alt="list" width={40} height={40} />
                                </div>
                            )}
                        </div>
                        <div className="flex-center basis-1/2">
                            <Link href="/">
                                <Image src="/icons/main-logo.svg" alt="main logo" width={160} height={36} />
                            </Link>
                        </div>
                        <div className="flex-right  basis-1/4">
                            {!session ? (
                                <Link href="/auth/signin" className="flex px-4 py-2">
                                    {userIcon}
                                </Link>
                            ) : (
                                <Link href="/mypage" className="flex px-4 py-2">
                                    {userIcon}
                                </Link>
                            )}
                            <CartBtn />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
