"use client";
import NavFooter from "@/app/components/nav-footer/nav-footer";
import Main from "./main";
import { MyPageProvider } from "./mypage-provider";

export default function Page() {
    return (
        <>
            <MyPageProvider>
                <NavFooter>
                    <Main />
                </NavFooter>
            </MyPageProvider>
        </>
    );
}