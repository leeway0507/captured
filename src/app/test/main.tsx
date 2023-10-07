"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import PageLoading from "../components/loading/page-loading";
import SortItem from "../category/[type]/component/sort-dropdown";

export default function Test() {
    return (
        <div className="m-auto">
            <SortItem />x
        </div>
        // <div className="h-[500px] w-[500px] bg-light-gray m-auto text-center active:bg-deep-gray " onClick={fetchData}>
        //     button
        //     {data && data}
        // </div>
    );
}
