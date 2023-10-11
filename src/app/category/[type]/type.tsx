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

export interface SizeObject {
    sizeType: string;
    size: string[];
    defaultSize: string[];
}

export interface filterMetaProps {
    brand: string[];
    category: string[];
    intl: string[];
    price: number[];
    sizeArray: SizeObject[];
    page: number;
}

export interface initMetaProps {
    sortBy: string[];
    brand: string[];
    category: string[];
    intl: string[];
    price: number[];
    sizeArray: string[];
}
