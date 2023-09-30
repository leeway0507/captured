"use client";

import { createContext, use, useContext, useState } from "react";
import { cartItemProps, productCardProps } from "./type";
import { useEffect } from "react";
interface ShoppingCartContext {
    getItemquantity: (id: number, size: string) => number;
    increaseCartQuantity: (id: number, size: string) => void;
    decreaseCartQuantity: (id: number, size: string) => void;
    removeFromCart: (id: number, size: string) => void;
    setBgFreeze: (value: string | undefined) => void;
    setNavOpen: (value: boolean) => void;
    setSearch: (value: string) => void;
    search: string;
    navOpen: boolean;
    bgFreeze: string | undefined;
    cartQuantity: number;
    cartItems: cartItemProps[];
    mockDB: productCardProps[];
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const storageCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(storageCartItems);
    }, []);

    const [cartItems, setCartItems] = useState<cartItemProps[]>([]);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const [search, setSearch] = useState("");

    // modal 열렸을 시 배경 freeze 용도
    const [bgFreeze, setBgFreeze] = useState<string | undefined>();
    const [navOpen, setNavOpen] = useState(false);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const getItemquantity = (id: number, size: string) => {
        return cartItems.find((item) => item.id === id && item.size === size)?.quantity || 0;
    };

    const increaseCartQuantity = (id: number, size: string) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id && item.size === size) == null) {
                return [...currItems, { id: id, size: size, quantity: 1 }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id && item.size === size) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const decreaseCartQuantity = (id: number, size: string) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id && item.size === size)?.quantity === 1) {
                return currItems.filter((item) => !(item.id === id && item.size === size));
            } else {
                return currItems.map((item) => {
                    if (item.id === id && item.size === size) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeFromCart = (id: number, size: string) => {
        setCartItems((currItems) => {
            return currItems.filter((item) => !(item.id === id && item.size === size));
        });
    };

    const mockDB: productCardProps[] = [
        {
            sku: 1,
            brand: "adidas originals",
            productName: "handball spezial black",
            productId: "db3021",
            price: 110000,
            shippingFee: 19000,
            intl: true,
            imgType: "avif",
        },
        {
            sku: 2,
            brand: "nike",
            productName: "jacquemus force black",
            productId: "DR0424-001",
            price: 120000,
            shippingFee: 19000,
            intl: true,
            imgType: "webp",
        },
        {
            sku: 3,
            brand: "adidas originals",
            productName: "tobacco pantone mesa",
            productId: "gy7396",
            price: 130000,
            shippingFee: 19000,
            intl: true,
            imgType: "avif",
        },
        {
            sku: 4,
            brand: "adidas originals",
            productName: "handball spezial black",
            productId: "db3021",
            price: 140000,
            shippingFee: 3000,
            intl: false,
            imgType: "avif",
        },
    ];

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemquantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                setBgFreeze,
                setNavOpen,
                setSearch,
                search,
                navOpen,
                bgFreeze,
                cartItems,
                cartQuantity,
                mockDB,
            }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
