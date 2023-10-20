"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CustomInput from "../../components/custom-input/cusotm-input";
import { checkEmail } from "../../components/custom-input/check-policy";
import { useSession } from "next-auth/react";
import PageLoading from "@/app/components/loading/page-loading";
import { redirect } from "next/navigation";
import { handleCredentials, handleKakao, handleNaver } from "./component/sign-in-providers";
import AlertModalWithoutBtn from "@/app/components/modal/alert-modal-without-btn";

const oauthClass = "flex-center relative rounded-lg text-sm py-3 border my-2 text-lg";
const accountFeatures = "flex-center my-1 basis-1/2";

const FailureModal = ({
    title,
    content,
    openFailureModal,
    setOpenFailureModal,
}: {
    title: string;
    content: string;
    openFailureModal: boolean;
    setOpenFailureModal: () => void;
}) => {
    return AlertModalWithoutBtn({
        title: title,
        content: content,
        isOpen: openFailureModal,
        setIsOpen: setOpenFailureModal,
        checkColor: "red",
    });
};

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openFailureModal, setOpenFailureModal] = useState(false);

    const openModalToggle = () => {
        setOpenFailureModal(!openFailureModal);
    };

    const { data, status } = useSession();

    if (status === "loading") {
        return <PageLoading />;
    }

    if (status === "authenticated") {
        redirect("/");
    }

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCredentials(email, password, openModalToggle);
        }
    };

    return (
        <div className="flex flex-col text-main-black px-5 max-w-md w-full mx-auto py-8">
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
                        onKeyDown={handleOnKeyPress}
                    />
                    <label htmlFor="password" className="custom-label-class">
                        비밀번호
                    </label>
                </div>
                <div>
                    <button
                        type="button"
                        className="black-bar w-full tracking-[0.1rem]"
                        onClick={() => handleCredentials(email, password, openModalToggle)}>
                        로그인
                    </button>
                    <div className="flex justify-between py-2 text-sm">
                        <Link href="/auth/register" className={` ${accountFeatures}`}>
                            회원가입
                        </Link>

                        <Link href="/auth/reset-password" className={` ${accountFeatures}`}>
                            비밀번호 찾기
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <div className={`${oauthClass}`} style={{ backgroundColor: "#03C75A" }} onClick={() => handleNaver()}>
                    <Image
                        src="/icons/naver.png"
                        width={30}
                        height={30}
                        alt="naver oauth"
                        className={`absolute left-3 text-white `}
                    />
                    <div className="text-white">네이버 로그인</div>
                </div>
                <div className={`${oauthClass}`} style={{ backgroundColor: "#FEE500" }} onClick={() => handleKakao()}>
                    <Image
                        src="/icons/kakao.svg"
                        width={20}
                        height={20}
                        alt="kakao oauth"
                        className={`absolute left-4`}
                    />
                    <div style={{ color: "#000000 85%" }}>카카오 로그인</div>
                </div>
            </div>
            <FailureModal
                title="로그인 실패"
                content="아이디 또는 비밀번호를 확인해주세요."
                openFailureModal={openFailureModal}
                setOpenFailureModal={openModalToggle}
            />
        </div>
    );
}