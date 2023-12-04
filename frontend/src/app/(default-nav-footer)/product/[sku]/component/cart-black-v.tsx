"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import Image from "next/image";
import Link from "next/link";
const Cart = () => {
    const { cartQuantity } = useShoppingCart();
    return (
        <div className="fixed top-0 z-50">
            <div className="px-4 flex justify-between h-[50px] w-full bg-main-black w-screen">
                <Link href="/" className="flex-left font-test text-xl text-white tracking-[0.1rem] ">
                    CAPTURED
                </Link>
                <div className="flex justify-between items-center gap-4">
                    <Link href="/cart" className=" right-[70px] z-50 h-[50px] flex-center">
                        <div className="flex gap-1 items-center">
                            <Image
                                src={`/icons/white/cart-white-mobile.svg`}
                                alt="cart"
                                width={24}
                                height={24}
                                priority
                            />
                            <div className="text-sm w-[10px] text-white">{cartQuantity} </div>
                        </div>
                    </Link>
                    <Link href="/search">
                        <Image
                            src={"/icons/white/search-input-white-mobile.svg"}
                            alt="search"
                            width="24"
                            height="24"
                            priority
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
