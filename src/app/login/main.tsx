"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CustomInput from "../components/custom-input/cusotm-input";
import { checkEmail } from "../components/custom-input/check-policy";

const oauthClass = "flex-center relative rounded-lg text-sm py-2 border my-2";
const oauthImageClass = "absolute left-4";
const oauthclickEffect =
    "cursor-pointer active:bg-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const accountFeatures = "flex-center my-1 basis-1/2 text-deep-gray hover:text-main-black cursor-pointer ";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col text-main-black px-5 max-w-[600px] h-full justify-between py-16 m-auto">
            <div className="flex flex-col py-2 gap-6">
                <div>
                    <CustomInput
                        label="이메일 주소"
                        type="email"
                        placeholder="wanted@captured.co.kr"
                        info="이메일 형식이 올바르지 않습니다."
                        value={email}
                        setValue={setEmail}
                        id="email"
                        checkPolicy={checkEmail}
                    />
                </div>
                <div className="relative">
                    <input
                        type="password"
                        id="password"
                        className="peer custom-input-class"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        placeholder="empty"
                    />
                    <label htmlFor="password" className="custom-label-class">
                        비밀번호
                    </label>
                </div>
                <div>
                    <div className="black-bar">로그인</div>
                    <div className="flex justify-between py-2 text-sm">
                        <Link href="/login/create" className={` ${accountFeatures}`}>
                            회원가입
                        </Link>

                        <Link href="/login/reset-password" className={` ${accountFeatures}`}>
                            비밀번호 찾기
                        </Link>
                    </div>
                </div>
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
