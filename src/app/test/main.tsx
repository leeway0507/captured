import React, { useEffect } from "react";
import { useShoppingCart } from "../shopping-cart-context";
import PageLoading from "../components/loading/page-loading";

export default function Page() {
    async function test() {
        const data = await fetch("http://localhost:8000/api/auth/regi1ster", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "lee@naver.com",
                password: "str",
                kr_name: "str",
            }),
        });
        const jsonData = await data.json();
        console.log("jsonData", jsonData);
    }
    useEffect(() => {
        test();
    }, []);
    return null;
}
