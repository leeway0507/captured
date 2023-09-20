"use client";
import { useShoppingCart } from "../shopping-cart-context";
import ProductCardSimpleArray from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";

export default function MobileMain() {
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
                            <ProductCardSimpleArray ProductCardArray={itemInfos} />
                        </div>
                        <div>
                            <ProductCheckOut ProductCardArray={itemInfos} />
                        </div>
                        <div className="mb-5"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
