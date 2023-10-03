"use client";

import CartproductCardArr from "./component/product-card-array";
import { cartProductCardProps } from "../type";
import ProductCheckOut from "../cart/component/product-check-out";
import { AddressForm } from "@/app/mypage/component/address-info-form";
import { mockAddressArrayAPI } from "../mypage/component/mock-apis";
import { IntlShipment } from "../components/notification/shipment-info";
import { useEffect, useState } from "react";
import { userAddressProps } from "../mypage/type";
import { useRouter } from "next/navigation";

const MainMobile = ({ arr }: { arr: cartProductCardProps[] }) => {
    const [selectedAddress, setSelectedAddress] = useState<userAddressProps | undefined>(undefined);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const openToggle = () => {
        setIsOpen(!isOpen);
        router.push("/order?chooseAddress=true");
    };
    const selectAddressToggle = (address: userAddressProps) => {
        setSelectedAddress(address);
        setIsOpen(false);
        router.push("/order");
    };

    //api-call - 제품 정보

    //api-call - 배송지 정보
    const addressArray = mockAddressArrayAPI;

    useEffect(() => {
        setSelectedAddress(addressArray[0]);
        console.log("mobile", addressArray[0]);
    }, [addressArray]);

    // api.getUserAddressArray
    return (
        <>
            <div
                className={`m-auto flex flex-col relative absolute top-0 lef-0 h-full w-full bg-white overflow-hidden ${
                    !isOpen ? "block" : "hidden"
                }`}>
                <div className="border-b border-deep-gray py-2">
                    <div className="text-2xl tracking-[0.2em] flex-center py-4 ">주문요약</div>
                    <CartproductCardArr arr={arr} />
                    <div className="py-2"></div>
                    <ProductCheckOut arr={arr} />
                </div>
                <div className="border-b border-deep-gray py-4 my-4">
                    <div className="text-2xl tracking-[0.2em] flex-center py-4">배송지 정보</div>
                    <div className="flex-right link-animation" onClick={openToggle}>
                        다른 배송지 선택하기
                    </div>
                    <div className="overflow-auto pt-2">
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
                <div className="border-b border-deep-gray pb-4">
                    <div className="text-2xl tracking-[0.2em] flex-center py-4 ">결제수단 선택</div>
                </div>
                <button type="button" className="black-bar-xl my-8">
                    결제하기
                </button>
            </div>

            {/* 배송지 선택 */}
            <div className={`w-full bg-white overflow-hidden ${isOpen ? "block" : "hidden"}`}>
                {addressArray.map(
                    (address, index) =>
                        address.addressId != selectedAddress?.addressId && (
                            <div key={index} className="flex flex-col border-b border-black flex-center py-3 ">
                                <AddressForm {...address} onDelete={false} />
                                <div
                                    className="m-auto w-full bg-light-gray rounded-md py-3 px-5 -mt-4 z-10"
                                    onClick={() => selectAddressToggle(address)}>
                                    <div className="black-bar">선택하기</div>
                                </div>
                            </div>
                        )
                )}
                <button
                    type="button"
                    className="border-b border-black flex-center py-1 active:bg-light-gray py-3 mb-6 tracking-[0.2rem] "
                    onClick={openToggle}>
                    닫기
                </button>
            </div>
        </>
    );
};

export default MainMobile;
