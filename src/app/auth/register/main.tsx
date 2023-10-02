"use client";
import { useState } from "react";
import CustomInput from "@/app/components/custom-input/cusotm-input";
import {
    checkEmail,
    checkName,
    checkPasswordPolicy,
    checkPasswordAgain,
} from "@/app/components/custom-input/check-policy";

export default function CreateAccount() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");

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
            <div className="black-bar-xl">가입하기</div>
        </div>
    );
}
