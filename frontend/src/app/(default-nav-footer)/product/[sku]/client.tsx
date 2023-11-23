"use client";
import useMobile from "@/app/components/hook/use-mobile";
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
    const { isMobile } = useMobile();

    // Add recentView Item
    useEffect(() => {
        const recentViewArr = JSON.parse(localStorage.getItem("recentView") || "[]");
        const newRecentViewArr = recentViewArr.filter((item: any) => item.sku !== data.sku);
        newRecentViewArr.push(data);
        newRecentViewArr.length > 10 && newRecentViewArr.shift();
        localStorage.setItem("recentView", JSON.stringify(newRecentViewArr));
    }, [data]);

    return <div>{isMobile ? <div className="px-2">{Mobile}</div> : <div className="px-2">{Pc}</div>}</div>;
}
