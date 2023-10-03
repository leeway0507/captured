import CartproductCardArr from "./component/product-card-array";
import { cartProductCardProps } from "../type";
import Link from "next/link";
import ProductCheckOut from "../cart/component/product-check-out";
import { mockAddressArrayAPI } from "../mypage/component/mock-apis";
import { useEffect, useState } from "react";
import { userAddressProps } from "../mypage/type";
import { useRouter } from "next/navigation";
import { IntlShipment } from "../components/notification/shipment-info";
import { AddressForm } from "@/app/mypage/component/address-info-form";
import { GrFormClose } from "react-icons/gr";

const MainPC = ({ arr }: { arr: cartProductCardProps[] }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedAddress, setSelectedAddress] = useState<userAddressProps | undefined>(undefined);
    const addressArray = mockAddressArrayAPI;
    const openToggle = () => {
        setIsOpen(!isOpen);
        router.push("/order?chooseAddress=true");
    };
    const orderPrice = arr.reduce((result, item) => {
        return result + item.price * item.quantity;
    }, 0);

    const domesticShippingFee = arr.reduce((result, item) => {
        return result + (item.intl ? 0 : item.shippingFee * item.quantity);
    }, 0);

    const intlShippingFee = arr.reduce((result, item) => {
        return result + (item.intl ? item.shippingFee * item.quantity : 0);
    }, 0);

    const totalShippingFee = domesticShippingFee + intlShippingFee;
    const totalPrice = orderPrice + totalShippingFee;
    function numToKorWon(x: number) {
        return "₩ " + x.toLocaleString("ko-KR");
    }

    const selectAddressToggle = (address: userAddressProps) => {
        setSelectedAddress(address);
        setIsOpen(false);
        router.push("/order");
    };

    useEffect(() => {
        setSelectedAddress(addressArray[0]);
        console.log("PC", addressArray[0]);
    }, [addressArray]);
    return (
        <>
            <div className="flex relative py-8 h-full gap-8">
                <div className="basis-[55%] pe-1 me-1 overflow-auto">
                    <div className="text-xl tracking-[0.2em] flex-center pb-4">주문요약</div>
                    <CartproductCardArr arr={arr} />
                    <div className="py-2"></div>
                    <ProductCheckOut arr={arr} />
                    <div className="py-2"></div>
                    <IntlShipment
                        title="해외 구매대행 상품 안내"
                        content="선택하신 상품 중 해외 구매대행 상품이 포함되어 있습니다.
                            상품 구입을 위해 개인통관부호가 필요하며 5 ~ 15일의 배송기간이 소요 됩니다."
                    />
                </div>
                <div className="basis-[45%] relative ">
                    <div className={`sticky top-[150px] ${isOpen ? "hidden" : "block"}`}>
                        <div className="border-b border-deep-gray">
                            <div className="text-xl tracking-[0.2em] flex-center pb-4">배송지 선택</div>
                            <div className="text-sm flex-right link-animation" onClick={openToggle}>
                                다른 배송지 선택하기
                            </div>
                            <div className="overflow-auto">
                                {selectedAddress ? (
                                    <AddressForm {...selectedAddress} onDelete={false} />
                                ) : (
                                    <div>배송지를 추가해주세요.</div>
                                )}
                            </div>
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
                        <div className="flex justify-between text-base-lg py-2">
                            <div>총 결제금액</div>
                            <div>{numToKorWon(totalPrice)}</div>
                        </div>
                        <Link href="/order" className="black-bar-xl tracking-[0.2em]">
                            결제하기
                        </Link>
                        {/* 배송지 선택 */}
                    </div>
                    <div className={`w-full bg-white overflow-hidden ${isOpen ? "block" : "hidden"}`}>
                        <div className="text-xl tracking-[0.2em] flex-center pb-4 flex ">
                            <div className="basis-1/4"></div>
                            <div className="basis-1/2 flex-center">배송지 변경</div>
                            <div className="basis-1/4 link-animation flex-center" onClick={openToggle}>
                                <GrFormClose />
                            </div>
                        </div>
                        {addressArray.map(
                            (address, index) =>
                                address.addressId != selectedAddress?.addressId && (
                                    <div key={index} className="flex flex-col flex-center py-3 ">
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
                            className="w-full border-b border-black flex-center py-1 active:bg-light-gray py-3 mb-6 tracking-[0.2rem] "
                            onClick={openToggle}>
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainPC;
