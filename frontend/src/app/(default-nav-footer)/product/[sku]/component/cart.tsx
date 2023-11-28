"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import Image from "next/image";
import Link from "next/link";
const Cart = () => {
    const { cartQuantity } = useShoppingCart();
    return (
        <Link href="/cart" className="fixed top-0 right-[70px] z-50 h-[50px] flex-center">
            <div className="flex gap-1 items-center">
                <Image src={`/icons/black/cart-black.svg`} alt="cart" width={28} height={28} priority />
                <div className="text-sm w-[10px]">{cartQuantity} </div>
            </div>
        </Link>
    );
};

export default Cart;
