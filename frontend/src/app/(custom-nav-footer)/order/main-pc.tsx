import CartproductCardArr from "./component/product-card-array";
import { cartProductCardProps } from "../../type";
import ProductCheckOut from "../../(default-nav-footer)/cart/component/product-check-out";
import { useState } from "react";
import { userAddressProps } from "../../type";
import { useRouter } from "next/navigation";
import CalculateOrderPrice from "./component/total-price";
import { DefaultAddressModule, SubAddressModule } from "./component/address-info";
import Logo from "../../components/nav-footer/component/logo";
import TossPaymentsWidgetPc from "./component/tosspayments/toss-payments-widget-pc";
import { User } from "@/app/type";
import Image from "next/image";

const MainPC = ({
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
    };

    //주소 선택 토글
    const selectAddressToggle = (address: userAddressProps) => {
        setSelectedAddress(address);
        setChangeAddress(false);
        router.replace("/order");
    };

    //orer price

    const { totalPrice, ...rest } = CalculateOrderPrice(arr);
    const totalPriceNumber = parseInt(totalPrice.replace(/[^0-9]/g, ""));

    if (arr === undefined) return;

    return (
        <>
            <div className="sticky top-0 h-[100px] w-full mx-auto p-4 z-50 bg-white border-b">
                <div className="flex-center h-full">
                    <Logo />
                </div>
            </div>
            <div className="max-w-5xl w-full flex relative pt-8 pb-16 h-full gap-8 mx-auto">
                <div className="basis-[55%] pe-1 me-1 overflow-auto">
                    <div className="text-xl tracking-[0.2em] flex-center pb-4 font-bold">주문요약</div>
                    <CartproductCardArr arr={arr} />
                    <div className="py-2"></div>
                    <ProductCheckOut arr={arr} />
                    <div className="py-2"></div>
                </div>
                {!changeAddress ? (
                    <div className="basis-[45%] max-w-[380px] relative ">
                        <div className={`sticky top-[100px] `}>
                            <div className="border-b border-deep-gray">
                                <div className="text-xl tracking-[0.2em] flex-center pb-4 font-bold">배송지 선택</div>
                                <div className="overflow-auto">
                                    <DefaultAddressModule
                                        addressArray={addressArray}
                                        selectedAddress={selectedAddress}
                                        openAddressToggle={openAddressToggle}
                                        accessToken={userInfo.accessToken}
                                    />
                                </div>
                            </div>
                            <div className="py-6">
                                <TossPaymentsWidgetPc
                                    price={totalPriceNumber}
                                    addressId={selectedAddress.addressId}
                                    userInfo={userInfo}
                                    arr={arr}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`basis-[45%] max-w-[380px]  bg-white overflow-hidden`}>
                        <div className="text-xl tracking-[0.2em] flex-center pb-4 flex ">
                            <div className="basis-1/4"></div>
                            <div className="basis-1/2 flex-center font-bold">배송지 변경</div>
                            <div className="basis-1/4 link-animation flex-right text-2xl" onClick={openAddressToggle}>
                                <Image
                                    src={"/icons/white/x-mark-white.svg"}
                                    alt="x-mark"
                                    width="20"
                                    height="20"
                                    className="m-2 me-6"
                                    priority
                                />
                            </div>
                        </div>
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
                )}
            </div>
        </>
    );
};

export default MainPC;
