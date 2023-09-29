"use client";
import CartProductCardArr from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { cartProductCardProps } from "../type";

export default function MainPC({ arr }: { arr: cartProductCardProps[] }) {
    return (
        <div className="flex-col w-full">
            <div className="flex-center flex-col py-10">
                <div className="flex-center w-full">
                    <div className="flex-center text-3xl text-sub-black tracking-[.25em] tb:tracking-[.4em] ">
                        BASKET
                    </div>
                </div>
            </div>
            <div className="flex relative mb-10 h-full">
                <div className="basis-7/12 pe-1 me-1 border-e overflow-auto">
                    <CartProductCardArr arr={arr} />
                </div>
                <div className="basis-5/12 relative ">
                    <div className="sticky top-[150px]">
                        <ProductCheckOut arr={arr} />
                        <div className="black-bar m-3 text-xl tracking-[0.2em]">주문하기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
