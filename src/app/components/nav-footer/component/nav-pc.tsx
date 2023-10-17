"use client";
import Link from "next/link";
import UserDropDown from "./user-dropdown";
import CartBtn from "./cart-btn";
import BrandDropDown from "./brand-dropdown";
import Logo from "./logo";
import { SearchBar } from "./mobile-sidebar-components";
import { useEffect, useState, useCallback } from "react";

export default function NavPc() {
    const [search, setSearch] = useState("");

    const onScroll = useCallback(() => {
        if (window.scrollY > 30) {
            document.getElementById("nav")!.classList.remove("nav-effect-back");
            document.getElementById("nav")!.classList.add("nav-effect");
        } else {
            document.getElementById("nav")!.classList.remove("nav-effect");
            document.getElementById("nav")!.classList.add("nav-effect-back");
        }
    }, []);

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <>
            <header>
                <div className="h-[180px] w-full m-auto z-50">
                    <div className="flex h-full">
                        <div className="flex flex-col w-full h-full">
                            <div className="basis-1/3 bg-white px-8 tb:px-12 xl:px-16 py-6">
                                <div className="flex justify-between items-center text-sm-base h-full my-auto ">
                                    <Link href="/category/latest">
                                        <div className="mx-2">LATEST</div>
                                    </Link>
                                    <div className="mx-2 group ">
                                        <Link href="/brands">BRANDS</Link>
                                        <BrandDropDown />
                                    </div>
                                    <Link href="/category/shoes">
                                        <div className="mx-2 ">SHOES</div>
                                    </Link>
                                    <Link href="/category/clothing">
                                        <div className="mx-2">CLOTHING</div>
                                    </Link>
                                    <Link href="/category/accessory">
                                        <div className="mx-2">ACCESSORY</div>
                                    </Link>
                                </div>{" "}
                            </div>
                            <div className="basis-2/3 flex justify-between px-8 tb:px-12 xl:px-16 " id="nav">
                                <div className="basis-3/12 flex-left">
                                    <SearchBar search={search} setSearch={setSearch} />
                                </div>
                                <div className="basis-6/12 flex-center">
                                    <Logo />
                                </div>
                                <div className="basis-3/12 flex-right">
                                    <UserDropDown />
                                    <CartBtn />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
