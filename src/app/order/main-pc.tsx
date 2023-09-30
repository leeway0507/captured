import CartproductCardArr from "./component/product-card-array";
import { cartProductCardProps } from "../type";
import Link from "next/link";
import ProductCheckOut from "../cart/component/product-check-out";
import { mockAddressArrayAPI } from "../mypage/component/mock-apis";
import { useEffect, useState } from "react";
import { addressFormProps } from "../mypage/type";
import { useRouter } from "next/navigation";
import { IntlShipment } from "../components/notification/shipment-info";
import { AddressForm } from "@/app/mypage/component/address-info-form";

const MainPC = ({ arr }: { arr: cartProductCardProps[] }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedAddress, setSelectedAddress] = useState<addressFormProps | undefined>(undefined);
    const addressArray = mockAddressArrayAPI;
    const openToggle = () => {
        setIsOpen(!isOpen);
        router.push("/order?chooseAddress=true");
    };

    useEffect(() => {
        setSelectedAddress(addressArray[0]);
    }, [addressArray]);
    return (
        <div className="flex relative mb-10 h-full gap-4">
            <div className="basis-[65%] pe-1 me-1 border-e overflow-auto">
                <div className="text-2xl tracking-[0.2em] flex-center py-8">주문요약</div>
                <CartproductCardArr arr={arr} />
            </div>
            <div className="basis-[35%] relative ">
                <div className="sticky top-[170px]">
                    <div className="border-b border-deep-gray py-4 my-4">
                        <div className="flex-right link-animation" onClick={openToggle}>
                            다른 배송지 선택하기
                        </div>
                        <div className="overflow-auto">
                            {selectedAddress ? (
                                <AddressForm {...selectedAddress} onDelete={false} />
                            ) : (
                                <div>배송지를 추가해주세요.</div>
                            )}
                        </div>

                        <IntlShipment
                            title="해외 구매대행 상품 안내"
                            content="선택하신 상품 중 해외 구매대행 상품이 포함되어 있습니다.
                        상품 구입을 위해 개인통관부호가 필요하며 5 ~ 15일의 배송기간이 소요 됩니다."
                        />
                    </div>
                    <div className="flex gap-1 py-6">
                        <div className="p-2 text-sm border border-deep-gray rounded flex-center basis-1/3">
                            카카오페이
                        </div>
                        <div className="p-2 text-sm border border-deep-gray rounded flex-center basis-1/3">
                            신용체크카드
                        </div>
                        <div className="p-2 text-sm border border-deep-gray rounded flex-center basis-1/3">
                            네이버페이
                        </div>
                    </div>
                    <ProductCheckOut arr={arr} />
                    <Link href="/order" className="black-bar-xl m-3 tracking-[0.2em]">
                        결제하기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MainPC;
