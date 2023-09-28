"use client";

import { useEffect, useState } from "react";
import { addressFormProps } from "../type";
import { phoneNumberAutoFormat } from "@/app/components/custom-input/check-policy";
import { useMyPage } from "../mypage-provider";
import Link from "next/link";
import YesNoModal from "@/app/components/modal/yes-no-modal";
import AlertModal from "@/app/components/modal/alert-modal";
import * as api from "../apis";

//css
const addressInfoClass = "text-base flex-right active:text-deep-gray cursor-pointer";

const AddressForm = ({
    addressId,
    krName,
    enName,
    customId,
    phone,
    krAddress,
    krAddressRest,
    enAddress,
    enAddressRest,
}: addressFormProps) => {
    const isMain = addressId.split("-")[1] === "0";
    const deleteAddressButton = <div className="active:text-deep-gray">삭제</div>;
    const [deleteAddress, setDeleteAddress] = useState(false);

    useEffect(() => {
        if (deleteAddress) {
            //api call
            // 주소 deactivate
            // input : addressId
            // output : void
            // api.deleteUserAddress;

            console.log("delete address");
        }
    }),
        [deleteAddress];

    return (
        <div
            className={`relative flex flex-col text-xs bg-light-gray border border-gray-50 rounded-md shadow p-4 w-full gap-2 mb-3 ${
                deleteAddress && "hidden"
            }`}
            key={addressId}>
            <div className="absolute underline text-sub-black right-0 px-4 flex cursor-pointer">
                {!isMain && (
                    <YesNoModal
                        toggleName={deleteAddressButton}
                        title="주소 삭제"
                        content="해당 주소를 삭제하시겠습니까?"
                        trueCallback={() => setDeleteAddress(true)}
                    />
                )}
                <Link
                    href={{
                        pathname: "/mypage/address",
                        query: {
                            addressId: addressId,
                            krName: krName,
                            enName: enName,
                            customId: customId,
                            phone: phone,
                            krAddress: krAddress,
                            krAddressRest: krAddressRest,
                            enAddress: enAddress,
                            enAddressRest: enAddressRest,
                        },
                    }}
                    shallow={true}
                    className="ms-2 active:text-deep-gray">
                    수정
                </Link>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">성 명</div>
                <div className="basis-3/4">
                    {krName}({enName})
                </div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">통관번호</div>
                <div className="basis-3/4">{customId}</div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">휴대폰번호</div>
                <div className="basis-3/4">{phoneNumberAutoFormat(phone)}</div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">한글주소</div>
                <div className="basis-3/4">
                    {krAddress} {krAddressRest}
                </div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">영문주소</div>
                <div className="basis-3/4">
                    {enAddressRest} {enAddress}
                </div>
            </div>
        </div>
    );
};

export default function AddressInfoFrom() {
    const { addressArray } = useMyPage();

    return (
        <div className="text-sm overflow-auto max-w-[500px] mx-auto">
            {addressArray.length < 4 ? (
                <Link href="mypage/address" className={`${addressInfoClass}`}>
                    + 신규 주소 추가
                </Link>
            ) : (
                <div className="flex-right grow">
                    <AlertModal
                        title="주소 추가 실패"
                        content="최대 3개의 주소만 등록할 수 있습니다."
                        buttonClassName={`${addressInfoClass}`}>
                        <div>+ 신규 주소 추가</div>
                    </AlertModal>
                </div>
            )}
            <div className="  overflow-auto pt-2">
                {addressArray.map((item) => {
                    return AddressForm(item);
                })}
            </div>
        </div>
    );
}
