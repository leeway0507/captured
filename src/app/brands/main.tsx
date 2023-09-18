"use client";

import { useShoppingCart } from "../shopping-cart-context";
import Image from "next/image";
import Link from "next/link";

export default function Brands() {
    const brandsArray = [
        "adidas original",
        "arcteryx",
        "adidas original",
        "arcteryx",
        "adidas original",
        "arcteryx",
        "adidas original",
        "arcteryx",
    ];

    const brandsComponent = (brandName: string) => {
        const brandNameBar = brandName.replace(" ", "-");
        return (
            <Link href={`cat/${brandNameBar}`} className="flex w-full px-2 brand-box">
                <div className="basis-3/5 flex-left grow text-2xl-3xl capitalize ps-3">{brandName}</div>
                <div className="flex-right relative  ">
                    <div className="absolute triangle-right top-0 left-0" />
                    <div className="grow w-[20px] h-full bg-main-black"></div>
                    <Image
                        src={`/brands/${brandNameBar}-white-logo.png`}
                        alt="test-img"
                        width={100}
                        height={100}
                        className="w-[80px] tb:w-[100px] bg-main-black"
                    />
                </div>
            </Link>
        );
    };

    return (
        <div className="flex flex-col justify-between w-full">
            <div className="flex-center flex-col py-4">
                <div className="flex-center w-full">
                    <div className="flex-center text-3xl text-sub-black tracking-[.25em] tb:tracking-[.4em] ">
                        BRANDS
                    </div>
                </div>
            </div>
            <div className="flex-center flex-col py-5 w-full">
                {brandsArray.map((brandName) => {
                    return brandsComponent(brandName);
                })}
            </div>
        </div>
    );
}
