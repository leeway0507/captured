import CustomInput from "@/app/components/custom-input/cusotm-input";
import {
    phoneNumberAutoFormat,
    checkName,
    checkEnName,
    checkPhone,
    checkCustomId,
} from "@/app/components/custom-input/check-policy";
import { useState } from "react";
import { addressFormProps } from "../type";
import { useRouter } from "next/navigation";
import YesNoModal from "@/app/components/modal/yes-no-modal";
import AlertModalWithoutBtn from "@/app/components/modal/alert-modal-without-btn";
import YesNoModalWithoutBtn from "@/app/components/modal/yes-no-modal-without-btn";
import * as api from "./apis";

const AddAddress = ({
    addressId = "",
    krName = "",
    enName = "",
    customId = "",
    phone = "",
    krAddress = "",
    enAddress = "",
    krAddressRest = "",
    enAddressRest = "",
}: addressFormProps) => {
    const router = useRouter();

    const [krNameProps, setKrNameProps] = useState(krName);
    const [enNameProps, setEnNameProps] = useState(enName);
    const [customIdProps, setCustomIdProps] = useState(customId);
    const [phoneProps, setPhoneProps] = useState(phoneNumberAutoFormat(phone));
    const [krAddressProps, setKrAddressProps] = useState(krAddress);
    const [krAddressRestProps, setKrAddressRestProps] = useState(krAddressRest);
    const [enAddressProps, setEnAddressProps] = useState(enAddress);
    const [enAddressRestProps, setEnAddressRestProps] = useState(enAddressRest);

    const addressFromObject = {
        addressId: addressId,
        krName: krNameProps,
        enName: enNameProps,
        customId: customIdProps,
        phone: phoneProps,
        krAddress: krAddressProps,
        enAddress: enAddressProps,
        krAddressRest: krAddressRestProps,
        enAddressRest: enAddressRestProps,
    };

    const handlePhoneNumber = (phone: string) => {
        const formattedInput = phoneNumberAutoFormat(phone);
        setPhoneProps(formattedInput);
    };

    const [customIdCheck, setCustomIdCheck] = useState<string | boolean>("");

    //modal

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openFailureModal, setOpenFailureModal] = useState(false);
    const [openCheckCustomIdModal, setOpenCheckCustomIdModal] = useState(false);
    const [openCustoIdNotValid, setOpenCustoIdNotValid] = useState(false);

    function FailureModal() {
        return AlertModalWithoutBtn({
            title: "주소 추가 실패",
            content: "주소 추가에 실패하였습니다.",
            isOpen: openFailureModal,
            setIsOpen: setOpenFailureModal,
            checkColor: "red",
        });
    }
    const SuccessModal = () => {
        return AlertModalWithoutBtn({
            title: "주소 추가 성공",
            content: "주소 추가에 성공하였습니다.",
            isOpen: openSuccessModal,
            setIsOpen: setOpenSuccessModal,
            trueCallback: () => {
                // router.push("/mypage/?pageindex=2");
                router.back();
            },
            checkColor: "green",
        });
    };
    const CustomNotValid = () => {
        return AlertModalWithoutBtn({
            title: "통관번호 확인 필요",
            content: "개인통관고유부호 확인이 필요합니다.",
            isOpen: openCustoIdNotValid,
            setIsOpen: setOpenCustoIdNotValid,
        });
    };

    const CheckCustomIdModal = () => {
        var content = (
            <div className="flex flex-col text-base mondaL ">
                <div className="flex">
                    <div className="me-5">한글성명</div>
                    <div>{krNameProps}</div>
                </div>
                <div className="flex">
                    <div className="me-5">전화번호</div>
                    <div>{phoneNumberAutoFormat(phoneProps)}</div>
                </div>
                <div className="flex">
                    <div className="me-5">통관번호</div>
                    <div>{customIdProps}</div>
                </div>
            </div>
        );
        return YesNoModalWithoutBtn({
            title: "입력정보 확인",
            content: content,
            trueCallback: () =>
                api.verifyCustomId({
                    reqData: {
                        name: krNameProps,
                        customId: customIdProps,
                        phone: phoneProps,
                    },
                    setCustomStatus: setCustomIdCheck,
                }),
            isOpen: openCheckCustomIdModal,
            setIsOpen: setOpenCheckCustomIdModal,
        });
    };

    return (
        <div className="py-16 px-8 text-sm">
            <div className="flex flex-col max-w-[600px] gap-8 mx-auto">
                <div className="flex gap-5">
                    <div className="grow">
                        <CustomInput
                            label="한글 성명"
                            type="text"
                            placeholder="홍길동"
                            info="최소 2글자 이상의 한글이어야 합니다."
                            value={krNameProps}
                            setValue={setKrNameProps}
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
                            value={enNameProps}
                            setValue={setEnNameProps}
                            id="name"
                            checkPolicy={checkEnName}
                        />
                    </div>
                </div>
                <CustomInput
                    label="휴대폰번호"
                    type="tel"
                    placeholder="010-0000-0000"
                    info="최대 11자리 숫자만 입력 가능합니다."
                    value={phoneProps}
                    setValue={handlePhoneNumber}
                    id="phone"
                    checkPolicy={checkPhone}
                    maxLength={13}
                />
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="grow me-2">
                            <CustomInput
                                label="개인통관고유부호"
                                type="text"
                                placeholder="p123456789"
                                info="통관부호 양식이 일치하지 않습니다."
                                value={customIdProps}
                                setValue={setCustomIdProps}
                                id="customId"
                                checkPolicy={checkCustomId}
                                maxLength={10}
                            />
                        </div>
                        <div className="cursor-pointer whitespace-nowrap flex-center pb-3">
                            <div
                                className="border p-2 bg-light-gray rounded active:bg-deep-gray text-xs whitespace-nowrap"
                                onClick={() => setOpenCheckCustomIdModal(true)}>
                                통관부호 확인
                            </div>
                        </div>
                    </div>
                    {customIdCheck === "" && (
                        <div className="flex-center bg-light-gray text-sub-black  text-sm rounded border px-5 py-2 ">
                            개인통관고유부호 불일치는 통관지연, 오배송의 원인이 됩니다.
                        </div>
                    )}
                    {customIdCheck && (
                        <div className="flex-center bg-green-600 text-light-gray   text-sm rounded border px-5 py-2 ">
                            개인통관고유부호 검증에 성공했습니다.
                        </div>
                    )}
                    {customIdCheck === false && (
                        <div className="flex-center flex-col bg-rose-700 text-light-gray text-sm rounded border px-5 py-2 ">
                            <p>개인통관고유부호 검증에 실패했습니다. </p>
                            <p>통관번호, 한글 성명, 전화번호 일치여부를 확인해주세요.</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="text-sm">한글주소</div>
                    <div className="flex justify-between">
                        <div className="grow me-2 flex-left">
                            <div className="py-2 border-b border-light-gray grow">
                                {krAddressProps === "" ? "도로명 주소를 입력해 주세요." : krAddressProps}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex text-sm  cursor-pointer py-2">
                                <div className="cursor-pointer whitespace-nowrap flex-center">
                                    <div className="border p-2 bg-light-gray rounded active:bg-deep-gray text-xs">
                                        도로명 주소 찾기
                                    </div>
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
                            value={krAddressRestProps}
                            setValue={setKrAddressRestProps}
                            id="setKrAddress"
                            checkPolicy={() => true}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm">영문주소</div>
                    <div className="flex justify-between">
                        <div className="grow me-2 flex-left">
                            <div className="py-2 border-b border-light-gray grow">
                                {enAddressProps === "" ? "도로명 주소를 입력해 주세요." : enAddressProps}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex text-sm  cursor-pointer py-2">
                                <div className="cursor-pointer whitespace-nowrap flex-center">
                                    <div className="border p-2 bg-light-gray rounded active:bg-deep-gray text-xs">
                                        도로명 주소 찾기
                                    </div>
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
                            value={enAddressRestProps}
                            setValue={setEnAddressRestProps}
                            id="setEnAddress"
                            checkPolicy={() => true}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    {customIdCheck === true ? (
                        <YesNoModal
                            toggleName={<div>{"추가/변경하기"}</div>}
                            title="주소 추가"
                            content="해당 주소를 등록하시겠습니까?"
                            buttonClassName="basis-3/4 black-bar"
                            trueCallback={() =>
                                api.AddAddress({
                                    reqData: addressFromObject,
                                    setOpenSuccessModal: setOpenSuccessModal,
                                    setOpenFailureModal: setOpenFailureModal,
                                })
                            }
                        />
                    ) : (
                        <div className="basis-3/4 black-bar bg-light-gray text-gray-400 cursor-not-allowed">
                            개인통관고유부호 확인이 필요합니다.
                        </div>
                    )}

                    <div className="black-bar basis-1/4 tracking-[0.2em]" onClick={() => router.back()}>
                        취소
                    </div>
                </div>
                <SuccessModal />
                <FailureModal />
                <CheckCustomIdModal />
                <CustomNotValid />
            </div>
        </div>
    );
};

export default AddAddress;
