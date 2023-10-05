"use client";
import Link from "next/link";

import AlertModal from "@/app/components/modal/alert-modal";
import { AddressForm } from "./address-info-form";
import { mockAddressArrayAPI } from "@/app/api/mock-apis";

//css
const addressInfoClass = "text-base flex-right active:text-deep-gray cursor-pointer";

export default function AddressInfoFrom() {
    const addressArray = mockAddressArrayAPI;

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
                    return <AddressForm {...item} onDelete={true} key={item.addressId} />;
                })}
            </div>
        </div>
    );
}
