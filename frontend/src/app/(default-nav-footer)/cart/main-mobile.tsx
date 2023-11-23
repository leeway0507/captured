"use client";
import CartProductCardArr from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { cartProductCardProps } from "../../type";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import CartEmptyGuide from "./component/cart-empty-guide";
import Link from "next/link";

export default function MainMobile({ arr }: { arr: cartProductCardProps[] }) {
    const { cartQuantity } = useShoppingCart();

    if (cartQuantity === undefined) return null;
    return cartQuantity === 0 ? (
        <CartEmptyGuide fontSize="xl" />
    ) : (
        <div className="tb:hidden flex flex-col grow ">
            <div className="flex-center text-3xl tb:text-4xl py-4 tb:py-8 text-sub-black tracking-[.15em]">CART</div>
            <div className="mx-2 h-full flex flex-col grow justify-between">
                <CartProductCardArr arr={arr} />
                <div className="py-1">
                    <ProductCheckOut arr={arr} />
                    <Link href="/order" className="black-bar-xl m-3 tracking-[0.2em]">
                        주문하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
