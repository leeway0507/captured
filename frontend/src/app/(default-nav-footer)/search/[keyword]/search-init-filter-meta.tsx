import { productCardProps } from "@/app/type";

const getUniqueItemsForColumn = (data: productCardProps[], column: keyof productCardProps): any[] => {
    // Extract the values for the specified column
    const columnValues = data.map((item) => item[column]);

    // Use Set to get unique values
    const uniqueValuesSet = new Set(columnValues);

    // Convert Set back to an array
    const uniqueValuesArray = Array.from(uniqueValuesSet);

    return uniqueValuesArray;
};

const getMinMaxPrice = (data: productCardProps[]) => {
    const prices = data.map((item) => item.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return [min, max];
};

const getUniqueSize = (data: productCardProps[]) => {
    const sizes = data.map((item) => item.size);
    const sizeArray = sizes.map((item) => item.split(","));
    const sizeSet = new Set(sizeArray.flat());
    const sizeArrayUnique = Array.from(sizeSet);

    const sizeOrder = {
        XS: 1,
        S: 2,
        M: 3,
        L: 4,
        XL: 5,
        XXL: 6,
        "ONE SIZE": 7,
        "-": 8,
    };

    const customSort = (a: string, b: string) => {
        const sizeA = sizeOrder[a as keyof typeof sizeOrder] || parseInt(a, 10);
        const sizeB = sizeOrder[b as keyof typeof sizeOrder] || parseInt(b, 10);

        return sizeA - sizeB;
    };

    sizeArrayUnique.sort(customSort);
    return sizeArrayUnique;
};

const getUniqueIntl = (data: productCardProps[]) => {
    const intl = getUniqueItemsForColumn(data, "intl");
    // true = 해외배송, false = 국내배송
    if (intl.length === 2) return ["해외배송", "국내배송"];
    if (intl[0]) return ["해외배송"];
    return ["국내배송"];
};

export default function createSearchInitFilterMeta(data: productCardProps[]) {
    return {
        sortBy: ["최신순", "낮은 가격 순", "높은 가격 순"],
        brand: getUniqueItemsForColumn(data, "brand"),
        intl: getUniqueIntl(data),
        price: getMinMaxPrice(data),
        category: {
            전체: {
                productType: getUniqueItemsForColumn(data, "categorySpec"),
                sizeArray: getUniqueSize(data),
            },
        },
    };
}
