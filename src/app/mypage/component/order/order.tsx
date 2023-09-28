"use client";

import SeeMoreOrders from "./order-table";
import { useState } from "react";

export default function OrderList({ fontSize }: { fontSize: string }) {
    const availableFontSize = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"];
    if (!availableFontSize.includes(fontSize)) {
        throw new Error("fontSize is not available");
    }

    const [seeMore, setSeeMore] = useState(false);

    return (
        <>
            <div className={`flex flex-col gap-2 w-full mondaL ${"text-" + fontSize}`}>
                <SeeMoreOrders showInitalRows={3} seeMore={seeMore} setSeeMore={setSeeMore} />
            </div>
        </>
    );
}
