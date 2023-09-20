"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CustomInput from "./component/cusotmInput";
const oauthClass = "flex-center relative rounded-lg text-sm py-2 border my-2";
const oauthImageClass = "absolute left-4";
const oauthclickEffect =
    "cursor-pointer active:bg-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const accountFeatures = "flex-center my-1 basis-1/3 text-deep-gray hover:text-main-black cursor-pointer ";

export default function CreateAccount() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");

    const checkPasswordPolicy = (password: string) => {
        if (password.length === 0) {
            return true;
        }
        if (password.length < 8) {
            return false;
        }
        // Check if password contains at least one digit and one letter
        const hasDigit = /[0-9]/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);

        if (!hasDigit || !hasLetter) {
            return false;
        }
        return true;
    };

    const checkPasswordAgain = (password1: string, password2: string) => {
        if (password1.length === 0 || password2.length === 0) {
            return true;
        }
        if (password1 !== password2) {
            return false;
        }
        return true;
    };

    const checkEmail = (email: string) => {
        if (email.length === 0) {
            return true;
        }
        // Regular expression for basic email validation
        const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

        return regex.test(email);
    };

    const checkName = (name: string) => {
        const hasHan = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(name);
        const notFullhan = /[ㄱ-ㅎ|ㅏ-ㅣ]/.test(name);

        if (name.length === 0) {
            return true;
        }

        if (notFullhan) {
            return false;
        }

        if (hasHan && name.length >= 2) {
            return true;
        }
        return false;
    };

    return (
        <div className="flex flex-col text-main-black px-5 max-w-[600px] justify-between py-12 m-auto">
            <div className="flex flex-col py-2 justify-between gap-4">
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
                <div>
                    <CustomInput
                        label="성 명"
                        type="text"
                        placeholder="홍길동"
                        info="최소 2글자 이상의 한글이어야 합니다."
                        value={name}
                        setValue={setName}
                        id="name"
                        checkPolicy={checkName}
                    />
                </div>
                <div>
                    <CustomInput
                        label="비밀번호 입력"
                        type="password"
                        info="8글자 이상의 영문 숫자 조합이어야 합니다."
                        value={password1}
                        setValue={setPassword1}
                        id="password1"
                        checkPolicy={checkPasswordPolicy}
                    />
                </div>
                <div>
                    <CustomInput
                        label="비밀번호 확인"
                        type="password"
                        info="비밀번호가 일치하지 않습니다."
                        value={password2}
                        setValue={setPassword2}
                        id="password2"
                        checkPolicy={(value) => checkPasswordAgain(password1, value)}
                    />
                </div>
            </div>
            <div className="flex-center bg-main-black text-white text-lg py-2 rounded-lg tracking-[0.3rem]">
                가입하기
            </div>
        </div>
    );
}