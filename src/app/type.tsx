import React from "react";
export interface productCardProps {
    id: number;
    brand: string;
    productName: string;
    productId: string;
    size: string;
    price: number;
    shippingFee: number;
    intl: boolean;
}

export interface cartProductCardProps extends productCardProps {
    quantity: number;
}

export interface cartItemProps {
    id: number;
    quantity: number;
}
