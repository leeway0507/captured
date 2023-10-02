"use client";

import { useState } from "react";
import { useShoppingCart } from "@/app/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { useParams } from "next/navigation";
import assert from "assert";

export default function Product() {
    const { mockDB, isMobile } = useShoppingCart();
    const { sku } = useParams();
    assert(typeof sku === "string", "sku must be a string");

    //API call to get product details
    // api : /api/product/:id
    // pageurl : /product/:brand/product-name + id
    const [product, setProduct] = useState(mockDB[parseInt(sku) - 1]);

    return (
        <>
            {isMobile ? (
                <MainMobile {...product} />
            ) : (
                <div className="px-5">
                    <MainPc {...product} />
                </div>
            )}
        </>
    );
}
