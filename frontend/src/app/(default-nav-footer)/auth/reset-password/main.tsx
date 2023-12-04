"use client";

import { useState } from "react";
import CustomInput from "@/app/components/custom-input/cusotm-input";
import {
    checkEmail,
    checkName,
    checkPasswordPolicy,
    checkPasswordAgain,
} from "@/app/components/custom-input/check-policy";
import { CheckEmailAndNameProxy } from "./fetch";
import { resetPasswordProxy } from "@/app/(default-nav-footer)/mypage/component/fetch";
import { useRouter } from "next/navigation";
import { AlertPopUpModal } from "@/app/components/modal/new-alert-modal";

export default function ResetPassword() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);

    const verificationSuccessHandler = AlertPopUpModal(
        "인증 성공",
        <div className="py-4">비밀번호 변경페이지로 이동합니다.</div>,
        "black-bar bg-green-700 w-full",
        () => {
            setIsEmailValid(true);
        }
    );
    const verificationFailureHandler = AlertPopUpModal(
        "인증 실패",
        <div className="py-4">일치하는 정보가 없습니다.</div>,
        "black-bar bg-rose-700 w-full",
        () => {}
    );

    const successHandler = AlertPopUpModal(
        "변경 성공",
        <div className="py-4">비밀번호가 변경되었습니다.</div>,
        "black-bar bg-green-700 w-full",
        () => {
            router.push("/auth/signin");
        }
    );
    const failureHandler = AlertPopUpModal(
        "변경 실패",
        <div className="py-4">비밀번호 변경에 실패하였습니다.</div>,
        "black-bar bg-rose-700 w-full",
        () => {}
    );

    const changeHandler = () => {
        resetPasswordProxy(password1, token)
            .then((res) => {
                if (res.message == "success") {
                    successHandler();
                } else {
                    failureHandler();
                }
            })
            .catch(failureHandler);
    };

    const checkEmailAndNameHandler = () => {
        CheckEmailAndNameProxy(email, name)
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setToken(res.data.token);
                    verificationSuccessHandler();
                } else {
                    verificationFailureHandler();
                }
            })
            .catch(verificationFailureHandler);
    };

    return (
        <div className="max-w-md mx-auto w-full py-8 px-5">
            <div className="flex-center text-2xl pb-8">비밀번호 찾기</div>
            <div className={`flex flex-col justify-between gap-6 ${isEmailValid && "hidden"}`}>
                <CustomInput
                    label="이메일 주소"
                    type="email"
                    placeholder="wanted@captured.co.kr"
                    info="이메일 형식이 올바르지 않습니다."
                    value={email}
                    setValue={setEmail}
                    id="email"
                    checkPolicy={checkEmail}
                    maxLength={50}
                />

                <CustomInput
                    label="성 명"
                    type="text"
                    placeholder="홍길동"
                    info="최소 2글자 이상의 한글이어야 합니다."
                    value={name}
                    setValue={setName}
                    id="name"
                    checkPolicy={checkName}
                    maxLength={10}
                />

                <button
                    className="black-bar "
                    disabled={email === "" || !checkEmail(email) || name === "" || !checkName(name)}
                    onClick={checkEmailAndNameHandler}>
                    이메일 확인
                </button>
            </div>

            <div className={`flex flex-col justify-between gap-6 ${isEmailValid ? "block" : "hidden"}`}>
                <div>
                    <CustomInput
                        label="비밀번호 입력"
                        type="password"
                        info="8글자 이상의 영문 숫자 조합이어야 합니다."
                        value={password1}
                        setValue={setPassword1}
                        id="password1"
                        checkPolicy={checkPasswordPolicy}
                        maxLength={20}
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
                        maxLength={20}
                    />
                </div>
                <button onClick={changeHandler} className="black-bar w-full">
                    변경하기
                </button>
            </div>
        </div>
    );
}
