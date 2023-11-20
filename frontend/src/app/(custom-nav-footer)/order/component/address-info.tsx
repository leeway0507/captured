"use client";
import Link from "next/link";
import { AddressForm } from "@/app/(default-nav-footer)/mypage/component/address-info-form";
import { userAddressProps } from "@/app/type";

export const DefaultAddressModule = ({
    addressArray,
    openAddressToggle,
    accessToken,
    selectedAddress,
}: {
    addressArray: userAddressProps[];
    openAddressToggle: () => void;
    accessToken: string;
    selectedAddress: userAddressProps;
}) => {
    return (
        <>
            {addressArray.length === 0 ? (
                <div className="w-full h-[200px] flex-center flex-col gap-4">
                    <Link className="underline text-sm link-animation" href="/mypage/address/create">
                        + 배송지 추가하기
                    </Link>
                </div>
            ) : (
                <>
                    <div className="text-sm flex-right link-animation" onClick={openAddressToggle}>
                        다른 배송지 선택하기
                    </div>
                    <AddressForm {...selectedAddress} accessToken={accessToken} onDelete={false} />
                </>
            )}
        </>
    );
};

export const SubAddressModule = ({
    addressArray,
    selectAddressToggle,
    accessToken,
    selectedAddress,
}: {
    addressArray: userAddressProps[];
    selectAddressToggle: (v: userAddressProps) => void;
    accessToken: string;
    selectedAddress: userAddressProps;
}) => {
    return (
        <>
            {addressArray.length === 1 ? (
                <div className="flex-center flex-col w-full py-8">
                    <Link className="underline text-sm link-animation" href="/mypage/address/create">
                        + 배송지 추가하기
                    </Link>
                </div>
            ) : (
                <>
                    {addressArray.map(
                        (address, index) =>
                            address.addressId != selectedAddress?.addressId && (
                                <div key={index} className="flex flex-col flex-center py-3 ">
                                    <AddressForm {...address} accessToken={accessToken} onDelete={false} />
                                    <div
                                        className="m-auto w-full bg-light-gray rounded-md py-3 px-5 -mt-4 z-10"
                                        onClick={() => selectAddressToggle(address)}>
                                        <div className="black-bar">선택하기</div>
                                    </div>
                                </div>
                            )
                    )}
                </>
            )}
        </>
    );
};
