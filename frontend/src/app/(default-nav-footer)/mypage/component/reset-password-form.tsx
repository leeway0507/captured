"use client";
import CustomInput from "@/app/components/custom-input/cusotm-input";
import { checkPasswordPolicy, checkPasswordAgain } from "@/app/components/custom-input/check-policy";
import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { resetPassword } from "./fetch";
import AlertModalWithoutBtn from "@/app/components/modal/alert-modal-without-btn";
import { useRouter } from "next/navigation";

const FailureModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) => {
    return AlertModalWithoutBtn({
        title: "변경 실패",
        content: "비밀번호 변경에 실패하였습니다.",
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        checkColor: "red",
    });
};
const SuccessModal = ({
    isOpen,
    setIsOpen,
    trueCallback,
}: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    trueCallback: () => void;
}) => {
    return AlertModalWithoutBtn({
        title: "변경 성공",
        content: "비밀번호가 변경되었습니다.",
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        trueCallback: trueCallback,
        checkColor: "green",
    });
};

export default function ResetPasswordFrom() {
    const router = useRouter();
    const { data: session } = useSession();
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openFailureModal, setOpenFailureModal] = useState(false);

    return (
        <div className="flex flex-col my-8 text-sm max-h-[600px] max-w-[500px] mx-auto">
            <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col">
                    <label htmlFor="email">이메일 주소</label>
                    <input type="text" value={session?.user.email} disabled className="custom-input-disabled" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name">성 명</label>
                    <input type="text" value={session?.user.krName} disabled className="custom-input-disabled" />
                </div>
                <div className="flex justify-between gap-4 ">
                    <div className="flex flex-col basis-1/2">
                        <CustomInput
                            label="신규 비밀번호"
                            type="password"
                            info="8글자 이상의 영문 숫자 조합이어야 합니다."
                            value={password1}
                            setValue={setPassword1}
                            id="password1"
                            checkPolicy={checkPasswordPolicy}
                        />
                    </div>
                    <div className="flex flex-col basis-1/2">
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
                {password1.length != 0 &&
                checkPasswordPolicy(password1) &&
                password2.length != 0 &&
                checkPasswordPolicy(password2) &&
                checkPasswordAgain(password1, password2) ? (
                    <button
                        className="black-bar"
                        onClick={() => {
                            resetPassword(password1, session?.user.accessToken)
                                .then((res) => {
                                    if (res.message == "success") {
                                        setOpenSuccessModal(true);
                                    } else {
                                        setOpenFailureModal(true);
                                    }
                                })
                                .catch((err) => {
                                    setOpenFailureModal(true);
                                });
                        }}>
                        변경하기
                    </button>
                ) : (
                    <button className="black-bar" disabled>
                        변경하기
                    </button>
                )}
            </div>
            <FailureModal isOpen={openFailureModal} setIsOpen={setOpenFailureModal} />
            <SuccessModal
                isOpen={openSuccessModal}
                setIsOpen={setOpenSuccessModal}
                trueCallback={() => {
                    router.push("/mypage?pageindex=0");
                }}
            />
        </div>
    );
}
