"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import PageLoading from "../components/loading/page-loading";

export default function Test() {
    const { data: session } = useSession();
    console.log("session123", session?.user.access_token);
    const [data, setData] = useState(null);

    async function fetchData() {
        const response = await fetch("http://localhost:8000/api/auth/test", {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `bearer ${session?.user.access_token}`,
            },
        })
            .then((res) => res.json().then((data) => console.log(data)))
            .catch((error) => {
                console.log(error);
            });

        return response;
    }

    return (
        <PageLoading></PageLoading>
        // <div className="h-[500px] w-[500px] bg-light-gray m-auto text-center active:bg-deep-gray " onClick={fetchData}>
        //     button
        //     {data && data}
        // </div>
    );
}
