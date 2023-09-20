"use client";
import { useShoppingCart } from "../shopping-cart-context";
import ProductCardSimpleArray from "../cart/component/cart-product-array";
import ProductCheckOut from "../cart/component/product-check-out";

export default function MobilePc() {
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
                    <ProductCardSimpleArray ProductCardArray={itemInfos} />
                </div>
                <div className="basis-5/12 relative ">
                    <div className="sticky top-[150px]">
                        <ProductCheckOut ProductCardArray={itemInfos} />
                    </div>
                </div>
            </div>
        </div>
    );
}
