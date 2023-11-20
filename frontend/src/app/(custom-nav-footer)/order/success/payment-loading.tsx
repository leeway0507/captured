"use client";
import { redirect } from "next/navigation";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { useEffect } from "react";
const PaymentLoading = ({ orderId }: { orderId: string }) => {
    const { initCart } = useShoppingCart();

    useEffect(() => {
        initCart();
        redirect(`/mypage?orderId=${orderId}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="fixed w-screen h-screen flex-center">
            <div className="text-3xl">결제중입니다...</div>
        </div>
    );
};

export default PaymentLoading;
