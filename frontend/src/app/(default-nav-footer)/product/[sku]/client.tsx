"use client";

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
    // Add recentView Item
    useEffect(() => {
        const recentViewArr = JSON.parse(localStorage.getItem("recentView") || "[]");
        const newRecentViewArr = recentViewArr.filter((item: any) => item.sku !== data.sku);
        newRecentViewArr.push(data);
        newRecentViewArr.length > 10 && newRecentViewArr.shift();
        localStorage.setItem("recentView", JSON.stringify(newRecentViewArr));
    }, [data]);

    return (
        <>
            <div className="block tb:hidden">{Mobile}</div>
            <div className="hidden tb:block px-2">{Pc}</div>
        </>
    );
}
