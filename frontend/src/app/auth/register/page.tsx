"use client";
import CreateAccount from "./main";
import Link from "next/link";
import Image from "next/image";
import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";

export default function Page() {
    return (
        <>
            <NavFooter>
                <CreateAccount />
            </NavFooter>
        </>
    );
}
