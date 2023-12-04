"use client";

import { useState } from "react";
import { verifyEmailCodeProxy, reSendCodeToEmailProxy } from "./fetch";
import Countdown from "./countdown";
import { AlertPopUpModal } from "@/app/components/modal/new-alert-modal";

export default function EmailVerification({
    email,
    isVerfied,
    setIsVerfied,
}: {
    email: string;
    isVerfied: boolean;
    setIsVerfied: (v: boolean) => void;
}) {
    const [code, setCode] = useState<string>("");
    const [isResend, setIsResend] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") return veficicationHandler();
    };

    const veficicationHandler = () => {
        if (code.length !== 6) {
            return alert("6자리 인증번호를 입력해주세요.");
        }
        verifyEmailCodeProxy(email, code).then((res) => {
            if (res.status === 200) {
                setIsVerfied(true);
                setErrorMessage(undefined);
                return successHandler();
            }
            if (res.status === 406) {
                return setErrorMessage("인증코드가 일치하지 않습니다.");
            }
            if (res.status === 404) {
                return setErrorMessage("인증코드가 만료되었습니다.");
            }
        });
    };

    const successHandler = AlertPopUpModal(
        "인증 성공",
        <div className="py-4">이메일 인증에 성공했습니다.</div>,
        "black-bar w-full bg-green-700",
        () => {}
    );
    const resendHandler = AlertPopUpModal(
        "인증메일 발송",
        <div className="py-4">인증 메일을 보냈습니다.</div>,
        "black-bar w-full",
        () => {}
    );

    const resendEmailHandler = () => {
        reSendCodeToEmailProxy(email).then((res) => {
            if (res.status === 200) {
                setIsResend(true);
                return resendHandler();
            }
        });
    };

    const isError = errorMessage === undefined ? false : true;

    return (
        <div className="py-4 ">
            <div className="flex gap-4 w-full">
                <div className="relative my-2 w-full">
                    <input
                        type="text"
                        placeholder=""
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        id="verification-code"
                        maxLength={6}
                        onKeyDown={handleOnKeyPress}
                        className={`peer custom-input-class disabled:text-gray-500 ${isError && "border-orange-600"}`}
                        disabled={isVerfied}
                    />
                    <label htmlFor={"verification-code"} className="custom-label-class">
                        인증코드 입력
                    </label>
                    <div className={`text-xs  ${isError ? "text-white" : "text-orange-600"}`}>{errorMessage}</div>
                </div>
                <div className="cursor-pointer whitespace-nowrap flex-center pb-3">
                    <button
                        className="border py-2 px-4 bg-light-gray rounded active:bg-deep-gray text-xs whitespace-nowrap "
                        onClick={veficicationHandler}
                        disabled={isVerfied}>
                        확인
                    </button>
                </div>
            </div>
            <div className={`w-full flex justify-between ${isVerfied && "hidden"}`}>
                <button
                    className="text-xs text-gray-500 disabled:cursor-notallowed disabled:text-gray-200 disabled:bg-transparent"
                    onClick={resendEmailHandler}
                    disabled={isResend}>
                    인증번호 재발송
                </button>
                <Countdown refresh={isResend} />
            </div>
        </div>
    );
}
