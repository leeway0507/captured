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

    const [isLoading, setLoading] = useState(true);
    const [addressArray, setAddressArray] = useState<userAddressProps[]>([]);

    useEffect(() => {
        getAddress(session?.user.access_token).then((data) => {
            setAddressArray(data);
            setLoading(false);
            console.log(data);
        });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (addressArray.length === 0) return <p>No profile data</p>;

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
                            access_token={session?.user.access_token}
                            key={item.addressId}
                        />
                    );
                })}
            </div>
        </div>
    );
}
