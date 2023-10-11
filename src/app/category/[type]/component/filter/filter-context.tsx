"use client";
import { createContext } from "react";
import { useState } from "react";
import { SizeObject } from "../../type";
interface filterContextProps {
    brand: Array<string>;
    category: Array<string>;
    shipping: Array<string>;
    price: Array<string>;
    size: SizeObject[];
    setBrand: (v: []) => void;
    setCategory: (v: []) => void;
    setShipping: (v: []) => void;
    setPrice: (v: []) => void;
    setSize: (v: []) => void;
}

export const FilterContext = createContext({} as filterContextProps);

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
    const filterType = {
        brand: ["adidas original", "nike"],
        category: ["신발", "자켓", "티셔츠"],
        shipping: ["해외배송", "국내배송"],
        price: ["10,000 - 20,000원", "20,000 - 50,000원"],
        size: [
            { sizeType: "신발", size: ["220", "230", "235", "240"] },
            { sizeType: "상의", size: ["S", "M", "L", "XL"] },
        ],
    };
    const [brand, setBrand] = useState<Array<string>>(filterType.brand);
    const [category, setCategory] = useState<Array<string>>(filterType.category);
    const [shipping, setShipping] = useState<Array<string>>(filterType.shipping);
    const [price, setPrice] = useState<Array<string>>(filterType.price);
    const [size, setSize] = useState<SizeObject[]>(filterType.size);
    return (
        <FilterContext.Provider
            value={{ brand, setBrand, category, setCategory, shipping, setShipping, price, setPrice, size, setSize }}>
            {children}
        </FilterContext.Provider>
    );
};

export default ShoppingCartProvider;
