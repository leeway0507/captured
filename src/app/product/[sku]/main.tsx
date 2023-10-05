"use client";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { mockDB } from "@/app/api/mock-apis";
import { useParams } from "next/navigation";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import assert from "assert";

export default function Product() {
    const params = useParams();
    const { isMobile } = useShoppingCart();

    const sku = params.sku;
    assert(typeof sku === "string");

    const product = mockDB[parseInt(sku) - 1];

    return (
        <div>
            <>
                {isMobile ? (
                    <div className="px-5">
                        <MainMobile {...product} />
                    </div>
                ) : (
                    <div className="px-5">
                        <MainPc {...product} />
                    </div>
                )}
            </>
        </div>
    );
}
