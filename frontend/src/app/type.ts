export type productCardProps = {
    sku: number;
    brand: string;
    korBrand: string;
    productName: string;
    korProductName: string;
    productId: string;
    price: number;
    shippingFee: number;
    intl: boolean;
    imgType: string;
    size: string[];
    category: string;
    color: string;
    categorySpec: string;
    price_desc_cursor?: number;
    price_asc_cursor?: number;
    deploy?: number;
}
export interface userAddressProps {
    addressId: string;
    krName: string;
    enName: string;
    customId: string;
    phone: string;
    krAddress: string;
    enAddress: string;
    krAddressDetail: string;
    enAddressDetail: string;
}
export interface setUserAddressProps extends userAddressProps {
    setAddressId: (v: string) => void;
    setKrName: (v: string) => void;
    setEnName: (v: string) => void;
    setCustomId: (v: string) => void;
    setPhone: (v: string) => void;
    setKrAddress: (v: string) => void;
    setEnAddress: (v: string) => void;
    setKrAddressDetail: (v: string) => void;
    setEnAddressDetail: (v: string) => void;
}

export interface userProps {
    krName: string;
    email: string;
    password: string;
}

export interface orderHistoryProps {
    orderId: string;
    userOrderNumber: string;
    orderedAt: string;
    orderStatus: string;
    orderTotalPrice: number;
    addressId: string;
    paymentMethod: string;
    paymentStatus: string;
}

export interface orderHistoryRequestProps {
    paymentKey: string;
    orderId: string;
    orderedAt: Date;
    orderTotalPrice: Number;
    paymentMethod: String;
    paymentInfo: String;
}

export interface orderRowProps {
    orderNum: number;
    orderId: string;
    sku: number;
    size: string;
    quantity: number;
    deliveryStatus: string;
    deliveryNumber: string;
    deliveryCompany: string;
}

export interface orderRowRequestProps {
    orderId: string;
    sku: number;
    size: string;
    quantity: number;
}

export interface orderDetailProductCardProps extends cartProductCardProps, orderRowProps {}
export interface OrderDetailProps extends orderHistoryProps {
    orderAddress: userAddressProps;
    orderItemList: orderDetailProductCardProps[];
}

export interface cartProductCardProps {
    sku: number;
    brand: string;
    korBrand: string;
    productName: string;
    korProductName: string;
    productId: string;
    price: number;
    shippingFee: number;
    intl: boolean;
    imgType: string;
    category: string;
    color: string;
    categorySpec: string;
    price_desc_cursor?: number;
    price_asc_cursor?: number;
    deploy?: number;
    quantity: number;
    size: string;
    selected: boolean;
}

export interface User {
    userId: string;
    email: string;
    krName: string;
    emailVerification: boolean;
    accessToken: string;
    signUpType: string;
}
