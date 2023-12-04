"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import Image from "next/image";
import Link from "next/link";
const Cart = () => {
    const { cartQuantity } = useShoppingCart();
    return (
        <div className="fixed top-0 z-50">
            <div className="px-4 flex justify-between h-[50px] w-full bg-white w-screen">
                <Link href="/" className="flex-left font-test text-xl text-rose-600 tracking-[0.05rem] ">
                    CAPTURED
                </Link>
                <div className="flex justify-between items-center gap-4">
                    <Link href="/cart" className=" right-[70px] z-50 h-[50px] flex-center">
                        <div className="flex gap-1 items-center">
                            <Image src={`/icons/white/cart-white.svg`} alt="cart" width={26} height={26} priority />
                            <div className="text-sm w-[10px]">{cartQuantity} </div>
                        </div>
                    </Link>
                    <Link href="/search">
                        <Image
                            src={"/icons/white/search-input-white.svg"}
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
