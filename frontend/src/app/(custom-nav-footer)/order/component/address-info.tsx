'use client'

import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { AddressForm } from '@/app/(default-nav-footer)/mypage/component/address-info-form'
import { userAddressProps } from '@/app/type'

export function DefaultAddressModule({
    addressArray,
    openAddressToggle,
    accessToken,
    selectedAddress,
}: {
    addressArray: userAddressProps[]
    openAddressToggle: () => void
    accessToken: string
    selectedAddress: userAddressProps
}) {
    return (
        <>
            {addressArray.length === 0 ? (
                <div className="flex-center h-[200px] w-full flex-col gap-4">
                    <Link className="link-animation text-sm underline" href="/mypage/address/create">
                        + 배송지 추가하기
                    </Link>
                </div>
            ) : (
                <button type="button" className="flex-right link-animation py-2 text-sm" onClick={openAddressToggle}>
                    다른 배송지 선택하기
                    <Image src="/icons/white/right-arrow.svg" alt="right-arrow" priority width={20} height={20} />
                </button>
            )}

            <AddressForm address={selectedAddress} accessToken={accessToken} onDelete={false} />
        </>
    )
}

export function SubAddressModule({
    addressArray,
    selectAddressToggle,
    accessToken,
    selectedAddress,
}: {
    addressArray: userAddressProps[]
    selectAddressToggle: (v: userAddressProps) => void
    accessToken: string
    selectedAddress: userAddressProps
}) {
    const v =
        addressArray.length === 1 ? (
            <div className="flex-center w-full flex-col py-8">
                <Link className="link-animation text-sm underline" href="/mypage/address/create">
                    + 배송지 추가하기
                </Link>
            </div>
        ) : (
            addressArray.map(
                (address) =>
                    address.addressId !== selectedAddress?.addressId && (
                        <div key={address.addressId} className="flex-center flex flex-col py-3 ">
                            <AddressForm address={address} accessToken={accessToken} onDelete={false} />
                            <button
                                type="button"
                                className="z-10 m-auto -mt-4 w-full rounded-md bg-light-gray px-5 py-3"
                                onClick={() => selectAddressToggle(address)}
                            >
                                <div className="black-bar">선택하기</div>
                            </button>
                        </div>
                    ),
            )
        )
    return v
}
