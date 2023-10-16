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

interface itemArray {
    productType: string[];
    sizeArray: string[];
}
export interface categorySpec {
    의류: itemArray;
    신발: itemArray;
    기타: itemArray;
    전체: itemArray;
}

export interface initFilterMetaProps {
    sortBy: string[];
    brand?: string[];
    category: categorySpec;
    intl: string[];
    price: number[];
    sizeArray: string[];
}

export interface filterMetaProps {
    sortBy: string[];
    brand: string[];
    category: string[];
    categorySpec: string[];
    sizeArray: string[];
    intl: string[];
    price: number[];
}

export interface filterRequestProps {
    sortBy: string;
    brand?: string;
    category?: string;
    intl: string;
    price: string;
    sizeArray: string;
}
