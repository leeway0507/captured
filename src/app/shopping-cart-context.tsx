"use client";
import { createContext, useContext, useState } from "react";
import Nav from "./components/nav-footer/nav-side-bar";

type ShoppingCartProviderProps = {
    children: React.ReactNode;
};
type cartItem = {
    id: number;
    quantity: number;
};

type ShoppingCartContext = {
    getItemquantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    setBgFreeze: (value: string | undefined) => void;
    setNavOpen: (value: boolean) => void;
    setSearch: (value: string) => void;
    search: string;
    navOpen: boolean;
    bgFreeze: string | undefined;
    cartQuantity: number;
    cartItems: cartItem[];
    mockDB: any;
};

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<cartItem[]>([
        { id: 1, quantity: 5 },
        { id: 2, quantity: 4 },
        { id: 3, quantity: 3 },
        { id: 4, quantity: 2 },
        { id: 5, quantity: 1 },
    ]);

    const [search, setSearch] = useState("");

    // modal 열렸을 시 배경 freeze 용도
    const [bgFreeze, setBgFreeze] = useState<string | undefined>();
    const [navOpen, setNavOpen] = useState(false);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const getItemquantity = (id: number) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    };

    const increaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id: id, quantity: 1 }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const decreaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id);
        });
    };

    const mockDB = [
        {
            id: 1,
            brand: "adidas originals",
            productName: "handball spezial black",
            productId: "db3021",
            size: "275",
            price: 110000,
            shippingFee: 19000,
            intl: true,
        },
        {
            id: 2,
            brand: "adidas originals",
            productName: "handball spezial black",
            productId: "db3021",
            size: "275",
            price: 120000,
            shippingFee: 19000,
            intl: true,
        },
        {
            id: 3,
            brand: "adidas originals",
            productName: "handball spezial black",
            productId: "db3021",
            size: "275",
            price: 130000,
            shippingFee: 19000,
            intl: true,
        },
        {
            id: 4,
            brand: "adidas originals",
            productName: "handball spezial black",
            productId: "db3021",
            size: "275",
            price: 140000,
            shippingFee: 3000,
            intl: false,
        },
        {
            id: 5,
            brand: "adidas originals",
            productName: "handball spezial black",
            productId: "db3021",
            size: "275",
            price: 150000,
            shippingFee: 19000,
            intl: true,
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
