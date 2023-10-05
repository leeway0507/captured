"use client";

import { createContext, useContext, useState } from "react";
import { cartItemProps } from "@/app/type";
import { useEffect } from "react";
import assert from "assert";
interface ShoppingCartContext {
    getItemquantity: (id: number, size: string) => number;
    increaseCartQuantity: (id: number, size: string) => void;
    decreaseCartQuantity: (id: number, size: string) => void;
    removeFromCart: (id: number, size: string) => void;
    setBgFreeze: (value: string | undefined) => void;
    setNavOpen: (value: boolean) => void;
    setSearch: (value: string) => void;
    isMobile: boolean | undefined;
    search: string;
    navOpen: boolean;
    bgFreeze: string | undefined;
    cartQuantity: number | undefined;
    cartItems: cartItemProps[] | undefined;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: { children: React.ReactNode }) {
    // mobile check
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= Number(process.env.NEXT_PUBLIC_MOBILE_WIDTH));
        };
        window.addEventListener("resize", handleResize);
        setIsMobile(window.innerWidth <= Number(process.env.NEXT_PUBLIC_MOBILE_WIDTH));
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // save cartItems to localStorage
    const [cartItems, setCartItems] = useState<cartItemProps[] | undefined>(undefined);

    useEffect(() => {
        const storageCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(storageCartItems);
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const [search, setSearch] = useState("");

    // modal 열렸을 시 배경 freeze 용도
    const [bgFreeze, setBgFreeze] = useState<string | undefined>();
    const [navOpen, setNavOpen] = useState(false);

    const cartQuantity = cartItems?.reduce((quantity, item) => item.quantity + quantity, 0);

    const getItemquantity = (id: number, size: string) => {
        return cartItems?.find((item) => item.id === id && item.size === size)?.quantity || 0;
    };

    const increaseCartQuantity = (id: number, size: string) => {
        setCartItems((currItems) => {
            assert(currItems, "cartItems is undefined currItems should be cartItemProps[]");
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
            assert(currItems, "cartItems is undefined currItems should be cartItemProps[]");
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
            assert(currItems, "cartItems is undefined currItems should be cartItemProps[]");
            return currItems.filter((item) => !(item.id === id && item.size === size));
        });
    };

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
                isMobile,
                search,
                navOpen,
                bgFreeze,
                cartItems,
                cartQuantity,
            }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
