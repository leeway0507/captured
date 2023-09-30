"use client";
import CartProductCardArr from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { cartProductCardProps } from "../type";
import { useShoppingCart } from "../shopping-cart-context";
import CartEmptyGuide from "./component/cart-empty-guide";
import Link from "next/link";

export default function MainPC({ arr }: { arr: cartProductCardProps[] }) {
    const { cartQuantity } = useShoppingCart();
    return cartQuantity === 0 ? (
        <CartEmptyGuide fontSize="3xl" />
    ) : (
        <div className="flex-col w-full">
            <div className="flex-center flex-col py-10">
                <div className="flex-center w-full">
                    <div className="flex-center text-3xl text-sub-black tracking-[.25em] tb:tracking-[.4em] ">
                        BASKET
                    </div>
                </div>
            </div>
            <div className="flex relative mb-10 h-full gap-4">
                <div className="basis-[65%] pe-1 me-1 border-e overflow-auto">
                    <div className="me-4">
                        <CartProductCardArr arr={arr} />
                    </div>
                </div>
                <div className="basis-[35%] relative ">
                    <div className="sticky top-[170px]">
                        <ProductCheckOut arr={arr} />
                        <Link href="/order" className="black-bar-xl m-3 tracking-[0.2em]">
                            주문하기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
