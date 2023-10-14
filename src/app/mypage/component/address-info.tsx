import Link from "next/link";
import AlertModal from "@/app/components/modal/alert-modal";
import { AddressForm } from "./address-info-form";
import { getAddress } from "./fetch";
import { userAddressProps } from "@/app/type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

//css
const addressInfoClass = "text-base flex-right active:text-deep-gray cursor-pointer";

export default function AddressInfo() {
    const { data: session } = useSession();
    console.log(session);

    const [isLoading, setLoading] = useState(true);
    const [addressArray, setAddressArray] = useState<userAddressProps[]>([]);

    useEffect(() => {
        getAddress(session?.user.accessToken).then((data) => {
            setAddressArray(data);
            setLoading(false);
            console.log(data);
        });
    }, []);

    if (isLoading) return null;
    if (addressArray.length === 0)
        return (
            <div className="flex-center flex-col py-8 text-xl">
                <div className="text-2xl">등록된 주소가 없습니다.</div>
                <Link href="mypage/address/create" className="pt-4 link-animation underline">
                    + 주소 추가하기
                </Link>
            </div>
        );

    return (
        <div className="text-sm overflow-auto max-w-[500px] mx-auto">
            {addressArray.length < 4 ? (
                <Link href="mypage/address/create" className={`${addressInfoClass}`}>
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
