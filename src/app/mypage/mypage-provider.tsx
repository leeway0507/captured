"use client";

import { createContext, useContext, useState } from "react";
import { addressFormProps, orderRowProps } from "./type";
import { mockAddressArrayAPI, mockOrderRowAPI } from "./component/mock-apis";
import * as api from "./apis";

interface MyPageContext {
    userInfo: { userId: number; email: string; name: string };
    addressArray: addressFormProps[];
    orderArray: orderRowProps[];
}

export const MyPageContext = createContext({} as MyPageContext);

export function useMyPage() {
    return useContext(MyPageContext);
}

export function MyPageProvider({ children }: { children: React.ReactNode }) {
    //api.getUserInfo()
    const [userInfo, setUserInfo] = useState({ userId: 1, email: "wanted@captured.co.kr", name: "김철수" });

    // api.getUserAddressArray
    const addressArray = mockAddressArrayAPI;

    // api.getUserOrderArray
    const orderArray = mockOrderRowAPI;

    return (
        <MyPageContext.Provider
            value={{
                userInfo,
                addressArray,
                orderArray,
            }}>
            {children}
        </MyPageContext.Provider>
    );
}