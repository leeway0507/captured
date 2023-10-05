"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";

export default function Test() {
    const { data: session } = useSession();
    console.log("session", session?.user.access_token);
    const [data, setData] = useState(null);

    async function fetchData() {
        const response = await fetch("http://localhost:8000/api/auth/", {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `${session?.user.access_token}`,
            },
        })
            .then((res) => res.json())
            .catch((error) => {
                console.log(error);
            });

        return response;
    }

    useEffect(() => {
        const x = fetchData();
        setData(x);
    }, []);
    console.log(data);
    return <div>{data}</div>;
}
