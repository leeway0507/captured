"use client";
import { useEffect, useState } from "react";

import { redirect } from "next/navigation";
export default function Main() {
    const [email, setEmail] = useState("");
    // useEffect(() => {
    //     const email = sessionStorage.getItem("emailVerification");
    //     if (email === null) redirect("/");

    //     setEmail(email);
    //     sessionStorage.removeItem("emailVerification");
    // }, []);

    // if (email === "") return <></>;

    return (
        <div className="flex-center flex-col max-w-lg mx-auto py-12 gap-8 px-5">
            <div className="text-3xl font-bold">CAPTURED 가입을 축하드립니다.</div>
            <div className="text-lg ">
                <div>
                    <span className="underline">{email}</span>로 인증메일을 발송하였습니다.
                </div>
                <div className="flex-center pt-4">이메일을 확인하여 계정을 활성화 해주세요.</div>
            </div>
            <div className="text-2xl underline text-blue-600 cursor-pointer active:text-gray-300">
                인증메일 다시 보내기
            </div>
        </div>
    );
}
