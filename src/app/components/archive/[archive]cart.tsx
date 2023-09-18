"use clientt";

import React, { useEffect, useRef } from "react";
import { useShoppingCart } from "../../shopping-cart-context";

import ProductCardSimpleArray from "../../cart/component/cart-product-array";
import ProductCheckOut from "../../cart/component/product-check-out";
import Image from "next/image";

export default function Cart({ isOpen, setIsOpen, openToggle }) {
    const barRef = useRef(null);

    const { bgFreeze } = useShoppingCart();

    useEffect(() => {
        const handler = (event) => {
            if (!barRef.current.contains(event.target) && bgFreeze === undefined) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [barRef, setIsOpen, bgFreeze]);

    const { mockDB, cartItems } = useShoppingCart();

    // filter productinfo and append quantity to mockDB
    const itemInfos = mockDB.filter((item) => {
        return cartItems.find((cartItem) => cartItem.id === item.id) != null;
    });

    itemInfos.forEach((item: any) => {
        const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (cartItem !== undefined) {
            item.quantity = cartItem.quantity;
        }
    });

    return (
        <>
            <aside
                id="sidebar-multi-level-sidebar"
                className={`absolute top-0 left-0 z-30 w-full  h-screen ${
                    isOpen ? "side-bar-visible" : "side-bar-hidden"
                }`}
                aria-label="Sidebar">
                <div className="flex flex-row h-full">
                    <div className="basis-3/12 tb:basis-5/12 bg-main-black opacity-50 "></div>
                    <div
                        className="flex flex-col basis-9/12 tb:basis-7/12 bg-white shadow-lg justify-between"
                        ref={barRef}>
                        <div className="flex-center flex-col pt-4 pb-2 mb-2  border-b">
                            <div className="flex-center w-full " onClick={openToggle}>
                                <div className="basis-1/5"></div>
                                <div className="flex-center text-2xl text-sub-black tracking-[.25em] basis-3/5">
                                    BASKET
                                </div>
                                <div className="flex-center basis-1/5">
                                    <Image src="/icons/close.svg" alt="close" width={24} height={24} />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-y-auto">
                            <ProductCardSimpleArray ProductCardArray={itemInfos} />
                        </div>
                        <ProductCheckOut ProductCardArray={itemInfos} />
                        <div className="basis-3/12"></div>
                    </div>
                </div>
            </aside>

            {/* ...rest of your component */}
        </>
    );
}
