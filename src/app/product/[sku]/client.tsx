"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { productCardProps } from "@/app/type";
import { useEffect } from "react";

export default function Client({
    Mobile,
    Pc,
    data,
}: {
    Mobile: React.ReactNode;
    Pc: React.ReactNode;
    data: productCardProps;
}) {
    const { isMobile } = useShoppingCart();

    // Add recentView Item
    useEffect(() => {
        const recentViewArr = JSON.parse(localStorage.getItem("recentView") || "[]");
        recentViewArr.filter((item: any) => item.sku === data.sku).length === 0 && recentViewArr.push(data);
        recentViewArr.length > 10 && recentViewArr.shift();
        localStorage.setItem("recentView", JSON.stringify(recentViewArr));
    }, [data]);

    return <div>{isMobile ? <div className="px-5">{Mobile}</div> : <div className="px-5">{Pc}</div>}</div>;
}
