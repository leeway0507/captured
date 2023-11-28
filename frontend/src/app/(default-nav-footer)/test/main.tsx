"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Main = () => {
    const router = useRouter();
    const url = window.location.search;

    var params = new URLSearchParams(window.location.search);
    params.set("page", "3");
    // location.search = params.toString();
    // console.log(`${urlOrigin}?${params.toString()}`);
    // if (window === undefined) return <></>;
    // router.push(`${urlOrigin}${params.toString()}`, {
    //     scroll: false,
    // });
    // console.log(window.location.host);
    // console.log(window.location.href);
    console.log(window.location.origin);
    console.log(window.location.pathname);

    const curUrl = window.location.origin + window.location.pathname;
    console.log(curUrl);

    return (
        <div className="flex-center grow">
            <button
                onClick={() => {
                    location.search = params.toString();
                }}
                className="w-[200px] h-[50px] rounded-md border bg-green-200">
                {" "}
                click me
            </button>
        </div>
    );
};

export default Main;
