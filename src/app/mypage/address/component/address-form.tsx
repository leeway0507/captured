"use client";
import CustomInput from "@/app/components/custom-input/cusotm-input";
import {
    phoneNumberAutoFormat,
    checkName,
    checkEnName,
    checkPhone,
    checkCustomId,
    checkAddressValidation,
    checkCustomIdValidation,
} from "@/app/components/custom-input/check-policy";
import { setUserAddressProps } from "@/app/type";
import { useState } from "react";
import YesNoModalWithoutBtn from "@/app/components/modal/yes-no-modal-without-btn";
import * as api from "../apis";

export interface addAddressFromProps extends setUserAddressProps {
    customIdTrueButton: JSX.Element;
    customIdFalseButton: JSX.Element;
    customDataInvalidButton: JSX.Element;
}

export default function AddressForm(props: addAddressFromProps) {
    const {
        addressId,
        krName,
        enName,
        customId,
        phone,
        krAddress,
        enAddress,
        krAddressDetail,
        enAddressDetail,
        setAddressId,
        setKrName,
        setEnName,
        setCustomId,
        setPhone,
        setKrAddress,
        setEnAddress,
        setKrAddressDetail,
        setEnAddressDetail,
        customIdTrueButton,
        customIdFalseButton,
        customDataInvalidButton,
    } = props;

    const [customIdCheck, setCustomIdCheck] = useState<string | boolean>("");
    const [openCheckCustomIdModal, setOpenCheckCustomIdModal] = useState(false);

    const CheckButton = () => {
        if (customIdCheck) {
            if (checkAddressValidation(krName, enName, customId, phone, krAddress, enAddress)) {
                return customIdTrueButton;
            }
            return customDataInvalidButton;
        } else {
            return customIdFalseButton;
        }
    };

    const CheckCustomIdModal = () => {
        var content = (
            <div className="flex flex-col text-base mondaL ">
                <div className="flex">
                    <div className="me-5">한글성명</div>
                    <div>{krName}</div>
                </div>
                <div className="flex">
                    <div className="me-5">전화번호</div>
                    <div>{phoneNumberAutoFormat(phone)}</div>
                </div>
                <div className="flex">
                    <div className="me-5">통관번호</div>
                    <div>{customId}</div>
                </div>
            </div>
        );
        return YesNoModalWithoutBtn({
            title: "입력정보 확인",
            content: content,
            trueCallback: () =>
                api.verifyCustomId({
                    reqData: {
                        name: krName,
                        customId: customId,
                        phone: phone,
                    },
                    setCustomStatus: setCustomIdCheck,
                }),
            isOpen: openCheckCustomIdModal,
            setIsOpen: setOpenCheckCustomIdModal,
        });
    };

    return (
        <>
            <div className="flex flex-col max-w-[600px] gap-8 text-sm">
                <div className="flex gap-5">
                    <div className="grow">
                        <CustomInput
                            label="한글 성명"
                            type="text"
                            placeholder="홍길동"
                            info="최소 2글자 이상의 한글이어야 합니다."
                            value={krName}
                            setValue={setKrName}
                            id="krName"
                            checkPolicy={checkName}
                        />
                    </div>
                    <div className="grow">
                        <CustomInput
                            label="영문 성명"
                            type="text"
                            placeholder="hong gil dong"
                            info="영문 성명을 입력해주세요."
                            value={enName}
                            setValue={setEnName}
                            id="enName"
                            checkPolicy={checkEnName}
                        />
                    </div>
                </div>
                <CustomInput
                    label="휴대폰번호"
                    type="tel"
                    placeholder="010-0000-0000"
                    info="최대 11자리 숫자만 입력 가능합니다."
                    value={phoneNumberAutoFormat(phone)}
                    setValue={setPhone}
                    id="phone"
                    checkPolicy={checkPhone}
                    maxLength={13}
                />
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="grow me-2">
                            {customIdCheck ? (
                                <div className="pb-2 border-b my-2">{customId}</div>
                            ) : (
                                <CustomInput
                                    label="개인통관고유부호"
                                    type="text"
                                    placeholder="p123456789"
                                    info="통관부호 양식이 일치하지 않습니다."
                                    value={customId}
                                    setValue={setCustomId}
                                    id="customId"
                                    checkPolicy={checkCustomId}
                                    maxLength={10}
                                />
                            )}
                        </div>
                        <div className="cursor-pointer whitespace-nowrap flex-center pb-3">
                            <button
                                type="button"
                                className="border p-2 bg-light-gray rounded-md active:bg-deep-gray text-xs whitespace-nowrap"
                                disabled={
                                    checkCustomIdValidation(customId, krName, phone)
                                        ? customIdCheck
                                            ? true
                                            : false
                                        : true
                                }
                                onClick={() => setOpenCheckCustomIdModal(true)}>
                                통관부호 확인
                            </button>
                        </div>
                    </div>
                    {customIdCheck === "" && (
                        <div className=" flex-center bg-light-gray text-sub-black rounded-md border px-5 py-2 ">
                            개인통관고유부호 불일치는 통관지연, 오배송의 원인이 됩니다.
                        </div>
                    )}
                    {customIdCheck && (
                        <div className=" flex-center bg-green-600 text-light-gray rounded-md border px-5 py-2 ">
                            개인통관고유부호 검증에 성공했습니다.
                        </div>
                    )}
                    {customIdCheck === false && (
                        <div className=" flex-center flex-col bg-rose-700 text-light-gray rounded-md border px-5 py-2 ">
                            <p>검증실패 : 통관번호, 한글 성명, 전화번호 일치여부를 확인해주세요.</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="text-sm">한글주소</div>
                    <div className="flex justify-between">
                        <div className="grow me-2 flex-left">
                            <div className="py-2 border-b border-light-gray grow text-deep-gray">
                                {krAddress === "" ? "도로명 주소를 입력해 주세요." : krAddress}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex  cursor-pointer py-2">
                                <div className="cursor-pointer whitespace-nowrap flex-center">
                                    <button
                                        type="button"
                                        className="border p-2 bg-light-gray rounded active:bg-deep-gray text-xs ">
                                        도로명 주소 찾기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-2">
                        <CustomInput
                            label="상세주소"
                            type="text"
                            placeholder="101,801"
                            info=""
                            value={krAddressDetail}
                            setValue={setKrAddressDetail}
                            id="setKrAddress"
                            checkPolicy={() => true}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm">영문주소</div>
                    <div className="flex justify-between">
                        <div className="grow me-2 flex-left">
                            <div className="py-2 border-b border-light-gray grow text-deep-gray">
                                {enAddress === "" ? "도로명 주소를 입력해 주세요." : enAddress}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex  cursor-pointer py-2">
                                <div className="cursor-pointer whitespace-nowrap flex-center">
                                    <button
                                        type="button"
                                        className="border p-2 bg-light-gray rounded active:bg-deep-gray text-xs "
                                        onClick={() => {
                                            setKrAddress("kor world");
                                            setEnAddress("hello world");
                                        }}>
                                        도로명 주소 찾기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-2">
                        <CustomInput
                            label="상세주소"
                            type="text"
                            placeholder="101,801"
                            info=""
                            value={enAddressDetail}
                            setValue={setEnAddressDetail}
                            id="setEnAddress"
                            checkPolicy={() => true}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <CheckButton />
                </div>
                <CheckCustomIdModal />
            </div>
        </>
    );
}
