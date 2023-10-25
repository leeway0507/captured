"use client";
import Image from "next/image";
import CartBtn from "./cart-btn";
import NavMobileSideBar from "./nav-mobile-sidebar";
import { useState } from "react";
import Logo from "./logo";

export default function NavMobile() {
    const [navOpen, setNavOpen] = useState(false);

    const closeNavToggle = () => {
        setNavOpen(false);
    };
    const openNavToggle = () => {
        setNavOpen(true);
    };

    return (
        <>
            <header>
                <div className="h-[100px] w-full m-auto px-4 z-50 bg-white">
                    <div className="flex h-full">
                        <div className="flex-left basis-1/4 z-50">
                            <div onClick={closeNavToggle} className={` cursor-pointer ${navOpen ? "block" : "hidden"}`}>
                                <Image src="/icons/close.svg" alt="close" width={28} height={28} />
                            </div>

                            <div onClick={openNavToggle} className={` cursor-pointer ${navOpen ? "hidden" : "block"}`}>
                                <div className="relative w-[40px] h-[40px]">
                                    <Image
                                        src="/icons/list.svg"
                                        alt="list"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-center basis-1/2">
                            <Logo />
                        </div>
                        <div className="flex-right  basis-1/4">
                            <CartBtn />
                        </div>
                    </div>
                </div>
                <NavMobileSideBar isOpen={navOpen} closeModal={closeNavToggle} />
            </header>
        </>
    );
}
