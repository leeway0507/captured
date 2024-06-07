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
import ConfirmPopUpModal from "@/app/components/modal/new-yes-no-modal";
import AddressForm from "@/app/(default-nav-footer)/mypage/address/[method]/component/address-form";
import { useRouter } from "next/navigation";
import { userAddressProps, userProps } from "@/app/type";
import * as api from "./component/fetch";
import Policy from "./component/policy";
import { AlertPopUpModal } from "@/app/components/modal/new-alert-modal";
import EmailVerification from "./component/email-verification";
import { handleCredentials } from "../signin/component/sign-in-providers";

export default function CreateAccount() {
    const router = useRouter();

    // policy agreement
    const [checkAllSelect, setCheckAllSelect] = useState(false);

    // default infos
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");

    // email verification
    const [isUnique, setIsUnique] = useState(false);
    const [isverified, setIsVerified] = useState(false);

    const failureHandler = AlertPopUpModal(
        "가입된 이메일",
        <div className="py-4">이미 가입된 메일입니다.</div>,
        "black-bar bg-rose-700 w-full",
        () => {}
    );

    const successHandler = AlertPopUpModal(
        "인증메일 발송",
        <div className="py-4">인증 메일을 보냈습니다.</div>,
        "black-bar w-full",
        () => setIsUnique(true)
    );
    const registerFailureHandler = AlertPopUpModal(
        "요청 실패",
        <div className="py-4">
            요청에 실패하였습니다. <br /> 다시 시도해주세요.
        </div>,
        "black-bar bg-rose-700 w-full",
        () => {}
    );

    const emailCheckHandler = () => {
        api.checkEmailDuplicationProxy(email)
            .then((res) => {
                if (res.status == 200) {
                    successHandler();
                } else {
                    failureHandler();
                }
            })
            .catch(registerFailureHandler);
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

    const trueButton = () => {
        const callback = () =>
            api.registerProxy(reqData).then((res) => {
                if (res) {
                    handleCredentials(email, password1, () => {});
                    router.push("/mypage");
                } else {
                    registerFailureHandler();
                }
            });

        const handler = ConfirmPopUpModal("회원가입", <div className="py-4">가입을 진행 하시겠습니까?</div>, callback);
        return (
            <button onClick={handler} className="black-bar w-full">
                가입하기
            </button>
        );
    };

    const falseButton = () => {
        return (
            <div className="flex-center grow">
                <button
                    type="button"
                    disabled
                    className="black-bar bg-light-gray text-main-black w-full cursor-not-allowed">
                    필수 항목을 입력해 주세요.
                </button>
            </div>
        );
    };

    return (
        <div className="flex flex-col text-main-black px-5 max-w-md w-full mx-auto py-8 relative">
            <div className={`block ${isOpen && "hidden"}`}>
                <div className="flex-center text-2xl pb-8">회원정보 입력</div>
                <div className="flex flex-col gap-2">
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
                                maxLength={50}
                            />
                        </div>
                        <div className="cursor-pointer whitespace-nowrap flex-center pb-3">
                            <button
                                type="button"
                                className="border p-2 bg-main-black text-white rounded active:bg-deep-gray text-xs whitespace-nowrap"
                                disabled={email === "" || !checkEmail(email) || isUnique}
                                onClick={emailCheckHandler}>
                                {isverified ? "이메일 인증완료" : "이메일 인증하기"}
                            </button>
                        </div>
                    </div>

                    {isUnique && (
                        <EmailVerification email={email} isVerfied={isverified} setIsVerfied={setIsVerified} />
                    )}

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
                            입
                            autoComplete="username"
                            maxLength={10}
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
                            autoComplete="new-password"
                            maxLength={20}
                        />
                    </div>
                    <Policy checkAllSelect={setCheckAllSelect} />
                    {checkDefaultInputValidation(email, name, password1, password2) ? (
                        <button className="black-bar w-full" onClick={() => setIsOpen(true)} disabled={!checkAllSelect}>
                            다 음
                        </button>
                    ) : (
                        <button className="disabled-bar w-full" disabled>
                            {isUnique ? "필수 항목을 입력해주세요." : "이메일 인증이 필요합니다."}
                        </button>
                    )}
                </div>
            </div>
            <div className={`flex flex-col ${isOpen ? "block" : "hidden"}`}>
                <div className="relative pb-4">
                    <button
                        className="absolute top-0 left-0 flex-left text-xl font-bold w-[50px] flex-left grow cursor-pointer z-30"
                        onClick={() => setIsOpen(false)}>
                        ❮
                    </button>
                    <div className="flex-center text-2xl ">배송지 입력</div>
                </div>
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
        </div>
    );
}
