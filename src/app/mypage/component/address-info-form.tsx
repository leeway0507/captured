"use client";
import { userAddressProps } from "@/app/type";
import { phoneNumberAutoFormat } from "@/app/components/custom-input/check-policy";
import Link from "next/link";
import YesNoModal from "@/app/components/modal/yes-no-modal";
import { deleteAddress, getAddress } from "./fetch";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface addressInfoFormProps extends userAddressProps {
    onDelete: boolean;
    access_token: string | undefined;
}

export const AddressForm = (props: addressInfoFormProps) => {
    const { onDelete, access_token, ...address } = props;
    const isMain = address.addressId.split("-")[2] === "0";
    const deleteAddressButton = <div className="active:text-deep-gray">삭제</div>;

    return (
        <div
            className={`relative flex flex-col text-xs bg-light-gray border border-gray-50 rounded-md shadow p-4 w-full gap-2 mb-3`}
            key={address.addressId}>
            <div className="absolute underline text-sub-black right-0 px-4 flex cursor-pointer">
                {onDelete && !isMain && (
                    <YesNoModal
                        toggleName={deleteAddressButton}
                        title="주소 삭제"
                        content="해당 주소를 삭제하시겠습니까?"
                        trueCallback={() => {
                            deleteAddress(address, access_token).then(() => location.reload());
                        }}
                    />
                )}
                <Link
                    href={{
                        pathname: "/mypage/address/update",
                        query: address,
                    }}
                    shallow={true}
                    className="ms-2 active:text-deep-gray">
                    수정
                </Link>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">성 명</div>
                <div className="basis-3/4">
                    {address.krName}({address.enName})
                </div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">통관번호</div>
                <div className="basis-3/4">{address.customId}</div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">휴대폰번호</div>
                <div className="basis-3/4">{phoneNumberAutoFormat(address.phone)}</div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">한글주소</div>
                <div className="basis-3/4">
                    {address.krAddress} {address.krAddressDetail}
                </div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">영문주소</div>
                <div className="basis-3/4">
                    {address.enAddressDetail} {address.enAddress}
                </div>
            </div>
        </div>
    );
};
