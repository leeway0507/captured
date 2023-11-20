"use client";
import { createContext, useContext, useState } from "react";
import { cartProductCardProps, productCardProps } from "@/app/type";
import { useEffect } from "react";
import assert from "assert";

interface ShoppingCartContext {
    getItemquantity: (sku: number, size: string) => number;
    increaseCartQuantity: (sku: number, size: string, productInfo: productCardProps) => void;
    decreaseCartQuantity: (sku: number, size: string) => void;
    removeFromCart: (sku: number, size: string) => void;
    initCart: () => void;
    isMobile: boolean | undefined;
    cartQuantity: number | undefined;
    cartItems: cartProductCardProps[] | undefined;
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    modalContent: string | JSX.Element;
    setModalContent: (content: string | JSX.Element) => void;
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
    const [cartItems, setCartItems] = useState<cartProductCardProps[] | undefined>(undefined);

    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        const storageCartItems = JSON.parse(cartItems ?? "[]");
        setCartItems(storageCartItems);
    }, []);

    useEffect(() => {
        cartItems !== undefined && localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const cartQuantity = cartItems?.reduce((quantity, item) => item.quantity + quantity, 0);

    const getItemquantity = (sku: number, size: string) => {
        return cartItems?.find((item) => item.sku === sku && item.size === size)?.quantity || 0;
    };

    const increaseCartQuantity = (sku: number, size: string, productInfo: productCardProps) => {
        setCartItems((currItems) => {
            if (currItems!.find((item) => item.sku === sku && item.size === size) == null) {
                // productInfo에 사이즈 변경, quantity 추가 후 cartItems에 저장
                productInfo.size = size;
                return [...currItems!, { ...productInfo, quantity: 1 }];
            } else {
                return currItems!.map((item) => {
                    if (item.sku === sku && item.size === size) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const decreaseCartQuantity = (sku: number, size: string) => {
        setCartItems((currItems) => {
            if (currItems!.find((item) => item.sku === sku && item.size === size)?.quantity === 1) {
                return currItems!.filter((item) => !(item.sku === sku && item.size === size));
            } else {
                return currItems!.map((item) => {
                    if (item.sku === sku && item.size === size) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeFromCart = (sku: number, size: string) => {
        setCartItems((currItems) => {
            assert(currItems, "cartItems is undefined currItems should be cartItemProps[]");
            return currItems.filter((item) => !(item.sku === sku && item.size === size));
        });
    };
    const initCart = () => {
        localStorage.setItem("cartItems", "[]");
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<string | JSX.Element>("");

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemquantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                initCart,
                isMobile,
                cartItems,
                cartQuantity,
                isModalOpen,
                setModalOpen,
                modalContent,
                setModalContent,
            }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
