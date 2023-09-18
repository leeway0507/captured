export interface catProductCardProps {
    id: number;
    productImgUrl: string;
    brand: string;
    productName: string;
    productId: string;
    price: number;
    intl: boolean;
}

export interface filterMetaProps {
    brand: Array<string>;
    category: Array<string>;
    size: Array<string>;
    sizeType: Array<string>;
    shipping: Array<string>;
    price: Array<string>;
}

//inline content
export interface ItemBoxSelectedProps {
    content: string;
    checked: boolean;
    setChecked: any;
}

export interface ItemBoxShowAllProps {
    type: string;
    size: string;
    checked: boolean;
    setChecked: any;
    exist: boolean;
}

export interface ItemBoxShowAllObjectProps {
    sizeType: string;
    sizeArray: Array<{
        size: string;
        checked: boolean;
        exist: boolean;
    }>;
}
