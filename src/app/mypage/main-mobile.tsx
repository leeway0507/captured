"use client";
import { useShoppingCart } from "../shopping-cart-context";
import OrderList from "./component/order-list";
import AccordionMobile from "./component/accordion-mobile";

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
            <div className="flex flex-row w-full px-5">
                <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-col py-10 gap-4">
                        <div className="flex-center text-3xl text-sub-black tracking-[.25em] tb:tracking-[.4em]">
                            주문배송
                        </div>
                        <OrderList fontSize="xs" />
                        <AccordionMobile />
                    </div>
                </div>
            </div>
        </>
    );
}
