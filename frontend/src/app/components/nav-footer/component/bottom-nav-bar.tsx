"use client";
import Link from "next/link";
import Image from "next/image";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";

const wrapperClass = "flex-center flex-col ";
const nameClass = "text-[0.5rem] ";

const swithcer = (nav: string) => {
    switch (nav) {
        case "home":
            return ["black", "white", "white", "white", "white"];
        case "brand":
            return ["white", "black", "white", "white", "white"];
        case "shop":
            return ["white", "white", "black", "white", "white"];
        case "cart":
            return ["white", "white", "white", "black", "white"];
        case "mypage":
            return ["white", "white", "white", "white", "black"];
        default:
            return ["white", "white", "white", "white", "white"];
    }
};

export const BottomNavBar = ({ nav }: { nav: string }) => {
    const arr = swithcer(nav);
    const { cartQuantity } = useShoppingCart();

    return (
        <div className="tb:hidden fixed bottom-0 z-50 grid grid-cols-5 w-full border bg-white py-3">
            <Link href="/">
                <div className={`${wrapperClass}`}>
                    <Image src={`/icons/${arr[0]}/home-${arr[0]}.svg`} alt="home" width={28} height={28} priority />
                    <div className={`${nameClass}`}>HOME</div>
                </div>
            </Link>
            <Link href="/brands">
                <div className={`${wrapperClass}`}>
                    <Image src={`/icons/${arr[1]}/brand-${arr[1]}.svg`} alt="brand" width={28} height={28} priority />
                    <div className={`${nameClass}`}>BRAND</div>
                </div>
            </Link>
            <Link href="/category/latest">
                {" "}
                <div className={`${wrapperClass}`}>
                    <Image src={`/icons/${arr[2]}/shop-${arr[2]}.svg`} alt="shop" width={28} height={28} priority />
                    <div className={`${nameClass}`}>SHOP</div>
                </div>
            </Link>
            <Link href="/cart">
                {" "}
                <div className={`${wrapperClass}`}>
                    <div className="flex gap-1 items-center">
                        <Image src={`/icons/${arr[3]}/cart-${arr[3]}.svg`} alt="cart" width={28} height={28} priority />
                        <div className="text-xs w-[10px]">{cartQuantity}</div>
                    </div>
                    <div className={`${nameClass} `}>CART</div>
                </div>
            </Link>
            <Link href="/mypage">
                {" "}
                <div className={`${wrapperClass}`}>
                    <Image src={`/icons/${arr[4]}/mypage-${arr[4]}.svg`} alt="mypage" width={28} height={28} priority />
                    <div className={`${nameClass}`}>MY</div>
                </div>
            </Link>
        </div>
    );
};
