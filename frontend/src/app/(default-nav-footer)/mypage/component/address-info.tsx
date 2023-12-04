"use client";
import Link from "next/link";
import { AddressForm } from "./address-info-form";
import { getAddressProxy } from "./fetch";
import { userAddressProps } from "@/app/type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AddressSkeleton } from "./address-skeleton";

//css
const addressInfoClass = "text-base flex-right active:text-deep-gray cursor-pointer";

export default function AddressInfo() {
    const { data: session } = useSession();

    const [addressArray, setAddressArray] = useState<userAddressProps[] | undefined>(undefined);

    useEffect(() => {
        if (session === undefined) return;
        getAddressProxy(session?.user.accessToken).then((data) => {
            setAddressArray(data);
        });
    }, [session]);

    if (addressArray === undefined) return <AddressSkeleton />;

    if (addressArray.length === 0) {
        return (
            <div className="flex-center flex-col py-8 text-xl">
                <div className="text-2xl">등록된 주소가 없습니다.</div>
                <Link href="mypage/address/create" className="pt-4 link-animation underline">
                    + 주소 추가하기
                </Link>
            </div>
        );
    }

    return (
        <div className="text-sm overflow-auto max-w-[500px] mx-auto px-2">
            {addressArray.length < 4 ? (
                <Link href="mypage/address/create" className={`${addressInfoClass}`}>
                    + 신규 주소 추가
                </Link>
            ) : (
                <div className="w-full flex-right">
                    <button
                        onClick={() => alert("최대 3개의 주소만 등록할 수 있습니다.")}
                        className={`${addressInfoClass}`}>
                        + 신규 주소 추가
                    </button>
                </div>
            )}
            <div className="overflow-auto pt-2">
                {addressArray.map((item: userAddressProps) => {
                    return (
                        <AddressForm
                            {...item}
                            onDelete={true}
                            accessToken={session?.user.accessToken}
                            key={item.addressId}
                        />
                    );
                })}
            </div>
        </div>
    );
}
