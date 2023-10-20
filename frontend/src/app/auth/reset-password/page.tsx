"use client";
import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import CreateAccount from "./main";

export default function Page() {
    return (
        <>
            <NavFooter>
                <CreateAccount />
            </NavFooter>
        </>
    );
}