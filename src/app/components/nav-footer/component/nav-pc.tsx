"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import Image from "next/image";
import Link from "next/link";
import UserDropDown from "./user-dropdown";
import CartBtn from "./cart-btn";
import BrandDropDown from "./brand-dropdown";

export default function NavPc() {
    const { setSearch, search, setNavOpen } = useShoppingCart();

    const closeNavToggle = () => {
        setNavOpen(false);
    };

    return (
        <>
            <header
                className="relative border-x-none h-[130px] px-16 xl:px-32 sticky top-0 flex flex-col justify-between border-light-gray z-50 bg-white pt-3"
                style={{ boxShadow: "0px 2px 0px var(--deep-gray)" }}>
                <div className="flex w-full justify-evenly">
                    <div className="flex-left basis-3/12" onClick={closeNavToggle}>
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
                    <div className="flex-center basis-6/12">
                        <Link href="/" className="w-[160px] h-[80px] relative">
                            <Image src="/icons/main-logo.svg" alt="main logo" fill />
                        </Link>
                    </div>
                    <div className="flex-right basis-3/12">
                        <UserDropDown />
                        <CartBtn />
                    </div>
                </div>
                <div className="flex justify-between text-sm-base pb-4">
                    <Link href="/category/latest">
                        <div className="mx-2">LATEST</div>
                    </Link>
                    <Link href="/brands">
                        <div className="mx-2 group ">
                            BRANDS
                            <BrandDropDown />
                        </div>
                    </Link>
                    <Link href="/category/shoes">
                        <div className="mx-2">SHOES</div>
                    </Link>
                    <Link href="/category/clothing">
                        <div className="mx-2">CLOTHING</div>
                    </Link>
                    <Link href="/category/accessory">
                        <div className="mx-2">ACCESSORY</div>
                    </Link>
                </div>
            </header>
        </>
    );
}
