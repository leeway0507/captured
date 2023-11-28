"use client";
import NavPc from "./nav-pc";

import Image from "next/image";
import Link from "next/link";

export default function NavMain() {
    const Logo = () => (
        <>
            <div className="px-4 flex justify-between h-[50px] w-full bg-white w-screen">
                <Link
                    href="/"
                    className="flex-left font-test text-xl py-3 text-rose-600 tracking-[0.2rem] "
                    style={{ textShadow: "3px 2px 1px lightgrey" }}>
                    CAPTURED
                </Link>
                <div className="flex-center">
                    <Link href="/search">
                        <Image
                            src={"/icons/white/search-input-white.svg"}
                            alt="search"
                            width="28"
                            height="28"
                            priority
                        />
                    </Link>
                </div>
            </div>
        </>
    );

    return (
        <>
            <div className="display tb:hidden">
                <Logo />
            </div>
            <div className="hidden tb:block">
                <NavPc />
            </div>
        </>
    );
}
