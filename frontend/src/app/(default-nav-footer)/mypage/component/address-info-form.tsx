import Link from 'next/link'
import React from 'react'

import { deleteAddressProxy } from './fetch'
import { userAddressProps } from '@/app/type'
import { phoneNumberAutoFormat } from '@/app/components/custom-input/check-policy'
import ConfirmPopUpModal from '@/app/components/modal/new-yes-no-modal'

export type AddressFormProps = {
    onDelete: boolean
    accessToken: string
    address: userAddressProps
}

function DeleteButton({ address, accessToken }: { address: userAddressProps; accessToken: string }) {
    const callback = () => {
        deleteAddressProxy(address, accessToken).then(() => window.location.reload())
    }

    const handler = ConfirmPopUpModal('주소 삭제', <div className="py-4">해당 주소를 삭제하시겠습니까?</div>, callback)
    return (
        <button type="button" onClick={handler} className="active:text-deep-gray">
            삭제
        </button>
    )
}

export function AddressForm({ onDelete, accessToken, address }: AddressFormProps) {
    return (
        <div
            className="relative mb-3 flex w-full flex-col gap-2 rounded-xl border border-gray-50 bg-light-gray p-4 text-sm shadow"
            key={address.addressId}
        >
            <div className="absolute right-0 flex cursor-pointer px-4 text-sub-black underline">
                {onDelete && !(address.addressId.split('-')[2] === '0') && (
                    <DeleteButton address={address} accessToken={accessToken!} />
                )}
                <Link
                    href={{
                        pathname: '/mypage/address/update',
                        query: { ...address },
                    }}
                    shallow
                    className="ms-2 active:text-deep-gray"
                >
                    수정
                </Link>
            </div>
            <div className="flex w-full">
                <div className="basis-1/4 whitespace-nowrap">성 명</div>
                <div className="basis-3/4">
                    {address.krName}({address.enName})
                </div>
            </div>
            <div className="flex w-full">
                <div className="basis-1/4 whitespace-nowrap">통관번호</div>
                <div className="basis-3/4">{address.customId}</div>
            </div>
            <div className="flex w-full">
                <div className="basis-1/4 whitespace-nowrap">휴대폰번호</div>
                <div className="basis-3/4">{phoneNumberAutoFormat(address.phone)}</div>
            </div>
            <div className="flex w-full">
                <div className="basis-1/4 whitespace-nowrap">한글주소</div>
                <div className="basis-3/4">
                    {address.krAddress} {address.krAddressDetail}
                </div>
            </div>
            <div className="flex w-full">
                <div className="basis-1/4 whitespace-nowrap">영문주소</div>
                <div className="basis-3/4">
                    {address.enAddressDetail} {address.enAddress}
                </div>
            </div>
        </div>
    )
}
