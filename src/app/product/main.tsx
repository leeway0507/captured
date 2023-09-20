"use client";

import { useState } from "react";
import Image from "next/image";
import type { catProductCardProps } from "./type";
import { useShoppingCart } from "../shopping-cart-context";
import MobileMain from "./main-mobile";
import PcMain from "./main-pc";

export default function Product() {
    const { mockDB } = useShoppingCart();

    //API call to get product details
    // api : /api/product/:id
    // pageurl : /product/:brand/product-name + id
    const [product, setProduct] = useState(mockDB[0]);

    // public image url : /brand/product-name + id/main
    // public image url : /brand/product-name + id/sub-1

    return (
        <>
            <div className="tb:hidden">
                <MobileMain />
            </div>
            <div className="hidden tb:block">
                <PcMain />
            </div>
        </>
    );
}
