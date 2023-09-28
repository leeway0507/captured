"use client";
import { useShoppingCart } from "../../shopping-cart-context";
import Image from "next/image";
import Link from "next/link";
import UserDropDown from "./user-dropdown";
import { useEffect } from "react";

export default function NavigationPc() {
    const { cartQuantity, setSearch, search, setNavOpen } = useShoppingCart();

    useEffect(() => {
        setNavOpen(false);
    }, [setNavOpen]);

    return (
        <>
            <header
                className="border-x-none h-[150px] px-10 pb-5 hidden tb:block relative sticky bg-white top-0 flex flex-row justify-between border-b border-light-gray z-50"
                style={{ boxShadow: "0px 0.5px 2px var(--deep-gray)" }}>
                <div className="flex w-full py-5">
                    <div className="flex-left basis-3/12">
                        <input
                            type="text"
                            className="text-xs-sm mt-0 block w-full px-0.5 border-0 border-b border-gray-200 focus:ring-0 focus:border-sub-black"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            placeholder="검색"
                            value={search}
                        />
                    </div>
                    <div className="flex justify-center basis-6/12">
                        <Link href="/">
                            <Image src="/icons/main-logo.svg" alt="main logo" width={160} height={36} />
                        </Link>
                    </div>
                    <div className="flex-right basis-3/12">
                        <div className="mx-1">
                            <UserDropDown />
                        </div>
                        <Link href="/cart" className="h-full flex-right">
                            <Image
                                src="/icons/shopping-cart.svg"
                                alt="shopping cart"
                                className="flex-right"
                                width={24}
                                height={24}
                            />
                            <div className="text-sm ps-1">{cartQuantity}</div>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-between text-sm-base">
                    <Link href="/cat/all" className="py-2 grow rounded-md flex-center active:bg-light-gray">
                        <div className="mx-2">LATEST</div>
                    </Link>
                    <Link href="/brands" className="py-2 grow rounded-md flex-center active:bg-light-gray">
                        <div className="mx-2">BRANDS</div>
                    </Link>
                    <Link href="/cat/shoes" className="py-2 grow rounded-md flex-center active:bg-light-gray">
                        <div className="mx-2">SHOES</div>
                    </Link>
                    <Link href="/cat/clothing" className="py-2 grow rounded-md flex-center active:bg-light-gray">
                        <div className="mx-2">CLOTHING</div>
                    </Link>
                    <Link href="/cat/accessory" className="py-2 grow rounded-md flex-center active:bg-light-gray">
                        <div className="mx-2">ACCESSORY</div>
                    </Link>
                </div>
            </header>
        </>
    );
}
