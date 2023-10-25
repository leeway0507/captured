"use client";
import { useEffect, useState } from "react";
import CustomInput from "@/app/components/custom-input/cusotm-input";
import {
    checkEmail,
    checkName,
    checkPasswordPolicy,
    checkPasswordAgain,
    checkDefaultInputValidation,
} from "@/app/components/custom-input/check-policy";
import YesNoModal from "@/app/components/modal/yes-no-modal";
import AlertModalWithoutBtn from "@/app/components/modal/alert-modal-without-btn";
import AddressForm from "@/app/mypage/address/[method]/component/address-form";
import { useRouter } from "next/navigation";
import { userAddressProps, userProps } from "@/app/type";
import * as api from "./component/fetch";

export default function CreateAccount() {
    const router = useRouter();

    // default infos
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");

    //email_duplication_check
    const [isUnique, setIsUnique] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openFailureModal, setOpenFailureModal] = useState(false);

    const FailureModal = () => {
        return AlertModalWithoutBtn({
            title: "중복 이메일",
            content: "중복된 이메일입니다.",
            isOpen: openFailureModal,
            setIsOpen: setOpenFailureModal,
            checkColor: "red",
        });
    };
    const SuccessModal = () => {
        return AlertModalWithoutBtn({
            title: "사용 가능한 이메일",
            content: "사용 가능한 이메일입니다.",
            isOpen: openSuccessModal,
            setIsOpen: setOpenSuccessModal,
            trueCallback: () => {
                setIsUnique(true);
            },
            checkColor: "green",
        });
    };

    //openAddressForm
    const [isOpen, setIsOpen] = useState(false);

    // address
    const [krNameProps, setKrNameProps] = useState(name);
    const [enNameProps, setEnNameProps] = useState("");
    const [customIdProps, setCustomIdProps] = useState("");
    const [phoneProps, setPhoneProps] = useState("");
    const [krAddressProps, setKrAddressProps] = useState("");
    const [krAddressDetailProps, setKrAddressDetailProps] = useState("");
    const [enAddressProps, setEnAddressProps] = useState("");
    const [enAddressDetailProps, setEnAddressDetailProps] = useState("");

    useEffect(() => {
        setKrNameProps(name);
    }, [name]);

    useEffect(() => {
        localStorage.setItem("email", email);
    }, [email]);

    const reqData: { userData: userProps; addressData: userAddressProps } = {
        userData: {
            email: email,
            password: password1,
            krName: name,
        },
        addressData: {
            addressId: "",
            krName: krNameProps,
            enName: enNameProps,
            customId: customIdProps,
            phone: phoneProps,
            krAddress: krAddressProps,
            enAddress: enAddressProps,
            krAddressDetail: krAddressDetailProps,
            enAddressDetail: enAddressDetailProps,
        },
    };

    // address buttons
    const trueButton = () => {
        return (
            <div className="flex-center grow">
                <YesNoModal
                    toggleName="가입하기"
                    title="회원가입"
                    content="회원가입하시겠습니까?"
                    buttonClassName="black-bar w-full"
                    trueCallback={() =>
                        api.register(reqData).then((res) => {
                            if (res) {
                                console.log(res);
                                router.push("/auth/verification");
                            } else {
                                alert("회원가입에 실패하였습니다.");
                            }
                        })
                    }
                />
            </div>
        );
    };

    const falseButton = () => {
        return (
            <div className="flex-center grow">
                <button
                    type="button"
                    disabled
                    className="black-bar bg-light-gray text-main-black w-full cursor-not-allowed">
                    개인통관고유부호를 확인해주세요.
                </button>
            </div>
        );
    };

    return (
        <div className="flex flex-col text-main-black px-5 max-w-md w-full mx-auto py-8">
            <div className={`block ${isOpen && "hidden"}`}>
                <div className="flex-center text-2xl pb-8">회원정보 입력</div>
                <form className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <div className="grow me-2">
                            <CustomInput
                                label="이메일 주소"
                                type="email"
                                placeholder="wanted@captured.co.kr"
                                info="이메일 형식이 올바르지 않습니다."
                                value={email}
                                setValue={setEmail}
                                id="email"
                                checkPolicy={checkEmail}
                                disabled={isUnique}
                            />
                        </div>
                        <div className="cursor-pointer whitespace-nowrap flex-center pb-3">
                            <button
                                type="button"
                                className="border p-2 bg-light-gray rounded active:bg-deep-gray text-xs whitespace-nowrap"
                                disabled={email === "" || !checkEmail(email) || isUnique}
                                onClick={() => {
                                    api.checkEmailDuplication(email).then((res) => {
                                        if (res) {
                                            setOpenSuccessModal(true);
                                        } else {
                                            setOpenFailureModal(true);
                                        }
                                    });
                                }}>
                                이메일 중복 확인
                            </button>
                        </div>
                    </div>
                    <div>
                        <CustomInput
                            label="성 명"
                            type="text"
                            placeholder="홍길동"
                            info="최소 2글자 이상의 한글이어야 합니다."
                            value={name}
                            setValue={setName}
                            id="username"
                            checkPolicy={checkName}
                            autoComplete="username"
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
                            autoComplete="new-password"
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
                            autoComplete="new-password"
                        />
                    </div>
                    {checkDefaultInputValidation(email, name, password1, password2) ? (
                        <button type="button" className="black-bar w-full" onClick={() => setIsOpen(true)}>
                            다 음
                        </button>
                    ) : (
                        <button type="button" className="disabled-bar w-full" disabled>
                            {isUnique ? "필수 항목을 입력해주세요." : "이메일 중복 여부를 확인해주세요."}
                        </button>
                    )}
                </form>
            </div>
            <div className={`flex flex-col ${isOpen ? "block" : "hidden"}`}>
                <div className="flex-center text-2xl pb-2">배송지 입력</div>
                <div className="py-8">
                    <AddressForm
                        addressId={""}
                        krName={krNameProps}
                        enName={enNameProps}
                        customId={customIdProps}
                        phone={phoneProps}
                        krAddress={krAddressProps}
                        enAddress={enAddressProps}
                        krAddressDetail={krAddressDetailProps}
                        enAddressDetail={enAddressDetailProps}
                        setAddressId={() => {}}
                        setKrName={setKrNameProps}
                        setEnName={setEnNameProps}
                        setCustomId={setCustomIdProps}
                        setPhone={setPhoneProps}
                        setKrAddress={setKrAddressProps}
                        setEnAddress={setEnAddressProps}
                        setKrAddressDetail={setKrAddressDetailProps}
                        setEnAddressDetail={setEnAddressDetailProps}
                        falseButton={falseButton()}
                        trueButton={trueButton()}
                    />
                </div>
            </div>
            <FailureModal />
            <SuccessModal />
        </div>
    );
}
