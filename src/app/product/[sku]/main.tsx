"use client";

import { useState } from "react";
import { useShoppingCart } from "@/app/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { useParams } from "next/navigation";
import assert from "assert";

export default function Product() {
    const { mockDB } = useShoppingCart();
    const { sku } = useParams();
    assert(typeof sku === "string", "sku must be a string");

    //API call to get product details
    // api : /api/product/:id
    // pageurl : /product/:brand/product-name + id
    const [product, setProduct] = useState(mockDB[parseInt(sku) - 1]);

    return (
        <>
            <div className="tb:hidden">
                <MainMobile {...product} />
            </div>
            <div className="hidden tb:block px-5">
                <MainPc {...product} />
            </div>
        </>
    );
}
