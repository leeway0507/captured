"use client";

import { useState } from "react";
import CustomInput from "@/app/components/custom-input/cusotm-input";
import {
    checkEmail,
    checkName,
    checkPasswordPolicy,
    checkPasswordAgain,
} from "@/app/components/custom-input/check-policy";
import { CheckEmailAndName } from "./fetch";
import AlertModalWithoutBtn from "@/app/components/modal/alert-modal-without-btn";
import { resetPassword } from "@/app/(default-nav-footer)/mypage/component/fetch";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [token, setToken] = useState("");

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openFailureModal, setOpenFailureModal] = useState(false);

    const FailureModal = () => {
        return AlertModalWithoutBtn({
            title: "인증 실패",
            content: "일치하는 정보가 없습니다.",
            isOpen: openFailureModal,
            setIsOpen: setOpenFailureModal,
            checkColor: "red",
        });
    };
    const SuccessModal = () => {
        return AlertModalWithoutBtn({
            title: "인증 성공",
            content: "비밀번호 변경페이지로 이동합니다.",
            isOpen: openSuccessModal,
            setIsOpen: setOpenSuccessModal,
            trueCallback: () => {
                setIsEmailValid(true);
            },
            checkColor: "green",
        });
    };

    const [openChangeSuccessModal, setOpenChangeSuccessModal] = useState(false);
    const [openChangeFailureModal, setOpenChangeFailureModal] = useState(false);

    const ChangeFailureModal = () => {
        return AlertModalWithoutBtn({
            title: "변경 실패",
            content: "비밀번호 변경에 실패했습니다",
            isOpen: openChangeFailureModal,
            setIsOpen: setOpenChangeFailureModal,
            checkColor: "red",
        });
    };
    const ChangeSuccessModal = () => {
        return AlertModalWithoutBtn({
            title: "변경 성공",
            content: "비밀번호 변경에 성공했습니다.",
            isOpen: openChangeSuccessModal,
            setIsOpen: setOpenChangeSuccessModal,
            trueCallback: () => {
                router.push("/auth/signin");
            },
            checkColor: "green",
        });
    };

    return (
        <div className="max-w-md mx-auto w-full py-8">
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
                />

                <button
                    className="black-bar "
                    disabled={email === "" || !checkEmail(email) || name === "" || !checkName(name)}
                    onClick={() => {
                        CheckEmailAndName(email, name).then((res) => {
                            if (res.token) {
                                setToken(res.token);
                                setOpenSuccessModal(true);
                            } else {
                                setOpenFailureModal(true);
                            }
                        });
                    }}>
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
                <button
                    className="black-bar"
                    onClick={() =>
                        resetPassword(password1, token).then((res) => {
                            if (res.message === "success") {
                                setOpenChangeSuccessModal(true);
                            } else {
                                setOpenChangeFailureModal(true);
                            }
                        })
                    }>
                    변경하기
                </button>
            </div>
            <FailureModal />
            <SuccessModal />
            <ChangeFailureModal />
            <ChangeSuccessModal />
        </div>
    );
}
