"use client";
import CartProductCardArr from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { cartProductCardProps } from "../type";

export default function MainMobile({ arr }: { arr: cartProductCardProps[] }) {
    return (
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
                    <div>
                        <div>
                            <CartProductCardArr arr={arr} />
                        </div>
                        <div>
                            <ProductCheckOut arr={arr} />
                        </div>
                        <div className="black-bar m-3 text-xl tracking-[0.2em]">주문하기</div>
                        <div className="mb-5"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
