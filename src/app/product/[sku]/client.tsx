"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";

export default function Client({ Mobile, Pc }: { Mobile: React.ReactNode; Pc: React.ReactNode }) {
    const { isMobile } = useShoppingCart();

    return <div>{isMobile ? <div className="px-5">{Mobile}</div> : <div className="px-5">{Pc}</div>}</div>;
}
