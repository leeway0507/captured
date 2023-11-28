"use client";
import CartproductCardArr from "./component/product-card-array";
import { cartProductCardProps } from "../../type";
import ProductCheckOut from "../../(default-nav-footer)/cart/component/product-check-out";
import { useState } from "react";
import { userAddressProps } from "@/app/type";
import { useRouter } from "next/navigation";
import { DefaultAddressModule, SubAddressModule } from "./component/address-info";
import { User } from "@/app/type";
import CalculateOrderPrice from "./component/total-price";
import TossPaymentsWidgetMobile from "./component/tosspayments/toss-payments-widget-mobile";

const MainMobile = ({
    arr,
    addressArray,
    userInfo,
}: {
    arr: cartProductCardProps[];
    addressArray: userAddressProps[];
    userInfo: User;
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

    //orer price
    const { totalPrice, ...rest } = CalculateOrderPrice(arr);
    const totalPriceNumber = parseInt(totalPrice.replace(/[^0-9]/g, ""));

    return (
        <div className="bg-light-gray">
            <div
                className={`m-auto flex flex-col relative absolute top-0 lef-0 h-full w-full overflow-hidden ${
                    !changeAddress ? "block" : "hidden"
                }`}>
                <div className="border-b border-deep-gray bg-white px-2">
                    <div className="text-2xl tracking-[0.2em] flex-center py-4 ">주문요약</div>
                    <CartproductCardArr arr={arr} />
                </div>

                <div className="mt-2 bg-white border-y border-deep-gray py-4 px-2">
                    <ProductCheckOut arr={arr} />
                </div>
                <div className="mt-2 border-y border-deep-gray bg-white">
                    <div className="text-2xl tracking-[0.2em] flex-center py-4">배송지 정보</div>
                    <div className="overflow-auto pt-2 px-2">
                        <DefaultAddressModule
                            openAddressToggle={openAddressToggle}
                            addressArray={addressArray}
                            selectedAddress={selectedAddress}
                            accessToken={userInfo.accessToken}
                        />
                    </div>
                </div>
                <div className="py-2 border-y border-deep-gray">
                    <TossPaymentsWidgetMobile
                        price={totalPriceNumber}
                        addressId={selectedAddress.addressId}
                        userInfo={userInfo}
                        arr={arr}
                    />
                </div>
            </div>

            {/* 배송지 선택 */}
            <div className={`w-full bg-white overflow-hidden ${changeAddress ? "block" : "hidden"}`}>
                <SubAddressModule
                    addressArray={addressArray}
                    selectAddressToggle={selectAddressToggle}
                    accessToken={userInfo.accessToken}
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
