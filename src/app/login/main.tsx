"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const oauthClass = "flex-center relative rounded-lg text-sm py-2 border my-2";
const oauthImageClass = "absolute left-4";
const oauthclickEffect =
    "cursor-pointer active:bg-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const accountFeatures = "flex-center my-1 basis-1/3 text-deep-gray hover:text-main-black cursor-pointer ";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col text-main-black px-5 max-w-[600px] h-full justify-between py-16 m-auto">
            <div className="flex flex-col py-2">
                <div className="pb-4">
                    <div className="text-lg">이메일 주소</div>
                    <input
                        type="email"
                        className="text-xs-sm mt-0 block w-full px-0.5 border-0 border-b border-gray-200 focus:ring-0 focus:border-main-black"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="wanted@captured.co.kr"
                        value={email}
                    />
                </div>
                <div className="py-2">
                    <div className="text-lg">비밀번호</div>
                    <input
                        type="password"
                        className="text-xs-sm mt-0 block w-full px-0.5 border-0 border-b border-gray-200 focus:ring-0 focus:border-main-black"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                    />
                </div>
            </div>
            <div className="flex-center bg-main-black text-white text-lg py-2">로그인</div>
            <div className="flex justify-between py-2 text-sm">
                <div className={` ${accountFeatures} border-e-2`}>회원가입</div>
                <div className={` ${accountFeatures} border-e-2`}>아이디 찾기</div>
                <div className={` ${accountFeatures}`}>비밀번호 찾기</div>
            </div>
            <div>
                <div className={`${oauthClass} ${oauthclickEffect}`}>
                    <Image
                        src="/icons/naver.svg"
                        width={24}
                        height={24}
                        alt="naver oauth"
                        className={`${oauthImageClass}`}
                    />
                    <div>네이버로 로그인</div>
                </div>
                <div className={`${oauthClass} ${oauthclickEffect}`}>
                    <Image
                        src="/icons/kakao.svg"
                        width={24}
                        height={24}
                        alt="naver oauth"
                        className={`${oauthImageClass}`}
                    />
                    <div>카카오로 로그인</div>
                </div>
                <div className={`${oauthClass}  ${oauthclickEffect}`}>
                    <Image
                        src="/icons/google.svg"
                        width={24}
                        height={24}
                        alt="naver oauth"
                        className={`${oauthImageClass}`}
                    />
                    <div>구글로 로그인</div>
                </div>
            </div>
        </div>
    );
}
