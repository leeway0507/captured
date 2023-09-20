export type cartProductCardProps = {
    id: number;
    brand: string;
    productName: string;
    productId: string;
    size: string;
    quantity: number;
    price: number;
    shippingFee: number;
    intl: boolean;
};

export type cartProductCardSimpleProps = {
    id: number;
    productImgUrl: string;
    brand: string;
    productName: string;
    productId: string;
    size: string;
    quantity: number;
    price: number;
    intl: boolean;
};

export type popUpRemoveModalProps = {
    id: number;
    productImgUrl: string;
    brand: string;
    productName: string;
    productId: string;
    size: string;
    intl: boolean;
    openModal: string | undefined;
    setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
};
