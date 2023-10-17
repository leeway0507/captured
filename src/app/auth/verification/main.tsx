"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Main() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email === null) {
            alert("잘못된 접근입니다.");
            router.push("/");
        } else {
            setEmail(email);
            localStorage.removeItem("email");
        }
    }, []);

    return (
        <div className="flex-center flex-col max-w-[600px] m-auto py-12 gap-8 px-5">
            <div className="text-3xl">이메일 인증</div>
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
