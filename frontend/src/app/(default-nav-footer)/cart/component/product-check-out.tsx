"use client";
import { useState } from "react";
import { cartProductCardProps } from "../../../type";

export default function ProductCheckOut({ arr }: { arr: cartProductCardProps[] }) {
    const orderPrice = arr?.reduce((result, item) => {
        return result + item.price * item.quantity;
    }, 0);

    const domesticShippingFee = arr?.reduce((result, item) => {
        return result + (item.intl === false ? item.shippingFee * item.quantity : 0);
    }, 0);

    const intlShippingFee = arr?.reduce((result, item) => {
        return result + (item.intl === true ? item.shippingFee * item.quantity : 0);
    }, 0);

    const totalShippingFee = domesticShippingFee + intlShippingFee;
    const totalPrice = orderPrice + totalShippingFee;

    function numToKorWon(x: number) {
        return "₩ " + x?.toLocaleString("ko-KR");
    }

    // 배송비 토글
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col border-sub-black justify-between text-sm">
            <div className="flex flex-col ">
                <div className="flex justify-between pb-1">
                    <div>물품가격</div>
                    <div>{numToKorWon(orderPrice)}</div>
                </div>

                <div className="flex flex-col relative">
                    <div className="flex justify-between">
                        <div className="flex-center" onClick={toggle}>
                            배송비
                            <div className="px-2 ">
                                <button className={`${isOpen && "rotate-90"}`}>❯</button>
                            </div>
                        </div>

                        <div>{numToKorWon(totalShippingFee)}</div>
                    </div>

                    <div className={`${isOpen ? "block" : "hidden"}`}>
                        {intlShippingFee > 0 ? (
                            <div className="flex justify-between text-xs text-gray-400 pt-1">
                                <div>해외배송</div>
                                <div>{numToKorWon(intlShippingFee)}</div>
                            </div>
                        ) : (
                            ""
                        )}
                        {domesticShippingFee > 0 ? (
                            <div className="flex justify-between text-xs text-gray-400 pt-1">
                                <div>국내배송</div>
                                <div>{numToKorWon(domesticShippingFee)}</div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className="flex justify-between text-base py-2">
                    <div>총 결제금액</div>
                    <div>{numToKorWon(totalPrice)}</div>
                </div>
            </div>
        </div>
    );
}
