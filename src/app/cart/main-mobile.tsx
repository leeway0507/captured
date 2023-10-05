"use client";
import CartProductCardArr from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { cartProductCardProps } from "../type";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import CartEmptyGuide from "./component/cart-empty-guide";
import Link from "next/link";

export default function MainMobile({ arr }: { arr: cartProductCardProps[] }) {
    const { cartQuantity } = useShoppingCart();
    return cartQuantity === 0 ? (
        <CartEmptyGuide fontSize="2xl" />
    ) : (
        <>
            <div className="flex flex-row w-full">
                <div className="flex flex-col justify-between w-full">
                    <div className="flex-center flex-col py-10">
                        <div className="flex-center w-full">
                            <div className="flex-center text-3xl text-sub-black tracking-[.25em] tb:tracking-[.4em] ">
                                BASKET
                            </div>
                        </div>
                    </div>
                    <div className="mx-4">
                        <div>
                            <CartProductCardArr arr={arr} />
                        </div>
                        <div>
                            <ProductCheckOut arr={arr} />
                        </div>
                        <Link href="/order" className="black-bar-xl m-3 tracking-[0.2em]">
                            주문하기
                        </Link>
                        <div className="mb-5"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
