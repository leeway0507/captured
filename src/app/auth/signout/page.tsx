"use client";
import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import EmailVerification from "./main";

export default function Page() {
    return (
        <>
            <NavFooter>
                <EmailVerification />
            </NavFooter>
        </>
    );
}
