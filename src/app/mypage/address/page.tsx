"use client";
import NavFooter from "@/app/components/nav-footer/nav-footer";
import Main from "./main";
import { addressFormProps } from "../type";

export default function Page({ params, searchParams }: { params: any; searchParams: addressFormProps }) {
    return (
        <>
            <NavFooter>
                <Main {...searchParams} />
            </NavFooter>
        </>
    );
}
