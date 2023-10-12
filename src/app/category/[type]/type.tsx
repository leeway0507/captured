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

export interface initFilterMetaProps {
    sortBy: string[];
    brand?: string[];
    category?: string[];
    intl: string[];
    price: number[];
    sizeArray: string[];
}

export interface filterProps {
    sortBy: string;
    brand?: string;
    category?: string;
    intl: string;
    price: string;
    sizeArray: string;
}
