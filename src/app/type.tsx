export interface productCardProps {
    sku: number;
    brand: string;
    productName: string;
    productId: string;
    price: number;
    shippingFee: number;
    intl: boolean;
    imgType: string;
}

export interface cartProductCardProps extends productCardProps {
    quantity: number;
    size: string;
}

export interface cartItemProps {
    id: number;
    quantity: number;
    size: string;
}
