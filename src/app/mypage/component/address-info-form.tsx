"use client";

import { useEffect, useState } from "react";
import { addressFormProps } from "../type";
import { phoneNumberAutoFormat } from "@/app/components/custom-input/check-policy";
import Link from "next/link";
import YesNoModal from "@/app/components/modal/yes-no-modal";

interface addressInfoFormProps extends addressFormProps {
    onDelete: boolean;
}

export const AddressForm = (props: addressInfoFormProps) => {
    const {
        addressId,
        krName,
        enName,
        customId,
        phone,
        krAddress,
        krAddressRest,
        enAddress,
        enAddressRest,
        onDelete = false,
    } = props;

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
                    className="me-2 active:text-deep-gray">
                    수정
                </Link>
                {onDelete && !isMain && (
                    <YesNoModal
                        toggleName={deleteAddressButton}
                        title="주소 삭제"
                        content="해당 주소를 삭제하시겠습니까?"
                        trueCallback={() => setDeleteAddress(true)}
                    />
                )}
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
