"use client";
import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import Main from "./main";
import { userAddressProps } from "@/app/type";

export default function Page({ params, searchParams }: { params: any; searchParams: userAddressProps }) {
    const { ...customId } = searchParams;

    return (
        <>
            <NavFooter>
                <Main {...searchParams} />
            </NavFooter>
        </>
    );
}
