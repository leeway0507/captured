"use client";
import { useShoppingCart } from "../shopping-cart-context";
import ProductCardSimpleArray from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { cartProductCardProps, mockDBprops } from "../type";

export default function MobileMain() {
    const { mockDB, cartItems } = useShoppingCart();

    // filter productinfo and append quantity to mockDB
    const itemInfos = mockDB.filter((item) => {
        return cartItems.find((cartItem) => cartItem.id === item.id) != null;
    });

    const cartProductCard: cartProductCardProps[] = itemInfos
        .map((item: mockDBprops) => {
            const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
            if (cartItem !== undefined) {
                return { ...item, quantity: cartItem.quantity };
            }
            // Return null for items that don't have corresponding cart items
            return null;
        })
        .filter((item): item is cartProductCardProps => item !== null);

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
                            <ProductCardSimpleArray ProductCardArray={cartProductCard} />
                        </div>
                        <div>
                            <ProductCheckOut ProductCardArray={cartProductCard} />
                        </div>
                        <div className="mb-5"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
