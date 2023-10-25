"use client";

import CartproductCardArr from "./component/product-card-array";
import { cartProductCardProps } from "../type";
import ProductCheckOut from "../cart/component/product-check-out";
import { AddressForm } from "@/app/mypage/component/address-info-form";
import { IntlShipment } from "../components/notification/shipment-info";
import { useEffect, useState } from "react";
import { userAddressProps } from "@/app/type";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DefaultAddressModule, SubAddressModule } from "./component/address-info";

const MainMobile = ({
    arr,
    accessToken,
    addressArray,
}: {
    arr: cartProductCardProps[];
    accessToken: string;
    addressArray: userAddressProps[];
}) => {
    const router = useRouter();
    const [changeAddress, setChangeAddress] = useState<boolean>(false);
    const [selectedAddress, setSelectedAddress] = useState<userAddressProps>(addressArray[0]);

    // 주소 오픈/클로즈 토글
    const openAddressToggle = () => {
        setChangeAddress(!changeAddress);
        window.location.href.includes("?chooseAddress=true")
            ? router.push("/order")
            : router.push("/order?chooseAddress=true");
    };

    //주소 선택 토글
    const selectAddressToggle = (address: userAddressProps) => {
        setSelectedAddress(address);
        setChangeAddress(false);
        router.push("/order");
    };

    return (
        <div className="px-4">
            <div className="sticky top-0 h-[100px] w-full m-auto px-4 z-50 bg-white">
                <div className="flex h-full">
                    <div className="flex-center basis-1/4"></div>
                    <div className="flex-center basis-1/2">
                        <Link href="/">
                            <Image src="/icons/main-logo.svg" alt="main logo" width={160} height={36} />
                        </Link>
                    </div>
                    <div className="flex-center basis-1/4"></div>
                </div>
            </div>
            <div
                className={`m-auto flex flex-col relative absolute top-0 lef-0 h-full w-full bg-white overflow-hidden ${
                    !changeAddress ? "block" : "hidden"
                }`}>
                <div className="border-b border-deep-gray py-2">
                    <div className="text-2xl tracking-[0.2em] flex-center py-4 ">주문요약</div>
                    <CartproductCardArr arr={arr} />
                    <div className="py-2"></div>
                    <ProductCheckOut arr={arr} />
                </div>
                <div className="border-b border-deep-gray py-4 my-4">
                    <div className="text-2xl tracking-[0.2em] flex-center py-4">배송지 정보</div>
                    <div className="overflow-auto pt-2">
                        <DefaultAddressModule
                            openAddressToggle={openAddressToggle}
                            addressArray={addressArray}
                            selectedAddress={selectedAddress}
                            accessToken={accessToken}
                        />
                    </div>

                    <IntlShipment
                        title="해외 구매대행 상품 안내"
                        content="선택하신 상품 중 해외 구매대행 상품이 포함되어 있습니다.
                        상품 구입을 위해 개인통관부호가 필요하며 5 - 15일의 배송기간이 소요 됩니다."
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
            <div className={`w-full bg-white overflow-hidden ${changeAddress ? "block" : "hidden"}`}>
                <SubAddressModule
                    addressArray={addressArray}
                    selectAddressToggle={selectAddressToggle}
                    accessToken={accessToken}
                    selectedAddress={selectedAddress}
                />
                <button
                    type="button"
                    className="w-full border-b border-black flex-center py-1 active:bg-light-gray py-3 mb-6 tracking-[0.2rem] "
                    onClick={openAddressToggle}>
                    닫기
                </button>
            </div>
        </div>
    );
};

export default MainMobile;
