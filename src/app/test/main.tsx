import React from "react";
import { useShoppingCart } from "../shopping-cart-context";

export default function Page() {
    const { removeFromCart, cartItems, decreaseCartQuantity } = useShoppingCart();
    return (
        <div className="w-[1000px] flex-center flex-col m-auto">
            <div className="bg-orange-200 flex-center" onClick={() => removeFromCart(1, "255")}>
                제거
            </div>
            <div className="px-5 bg-orange-200 flex-center" onClick={() => decreaseCartQuantity(1, "255")}>
                감소
            </div>
            <div className="flex">
                {cartItems.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex gap-2 flex-col">
                                <div>{item.id}</div>
                                <div>{item.size}</div>
                                <div>{item.quantity}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
