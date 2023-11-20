"use client";

import OrderDetailProductCardArray from "./order-product-card-array";
import { phoneNumberAutoFormat } from "@/app/components/custom-input/check-policy";
import { userAddressProps, orderHistoryProps, cartProductCardProps } from "@/app/type";
import ProductCheckOut from "@/app/(default-nav-footer)/cart/component/product-check-out";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/app/components/utils/scroll";
import { orderDetailProductCardProps } from "@/app/type";

export default function OrderDetailForm({
    targetOrder,
    orderAddress,
    orderItemList,
}: {
    targetOrder: orderHistoryProps;
    orderAddress: userAddressProps;
    orderItemList: orderDetailProductCardProps[];
}) {
    const router = useRouter();

    return (
        <div className="flex flex-col px-3 pt-8 tb:pt-12 pb-12 tb:pb-24">
            <div className="flex flex-col pb-8">
                <div className="flex-left text-xl mb-4 border-b border-main-black w-full py-2 bg-white z-20">
                    상세 주문 정보
                </div>
                <div className="grid grid-cols-5 text-sm">
                    <div className="grid grid-rows-4 gap-1">
                        <div className="">주문번호</div>
                        <div className="">결제방식</div>
                        <div className="">결제일</div>
                        <div className="">결제코드</div>
                    </div>
                    <div className="grid col-span-2 grid-rows-4 gap-1">
                        <div>{targetOrder.userOrderNumber}</div>
                        <div>{targetOrder.paymentMethod}</div>
                        <div className="text-xs-sm flex-left">{targetOrder.orderedAt.replace("T", " ")}</div>
                        <div className="text-xs flex-left">{targetOrder.orderId}</div>
                    </div>
                    <div className="grid grid-rows-4 gap-1">
                        <div className="">결제금액</div>
                        <div className="">결제상태</div>
                        <div className="">주문상태</div>
                        <div className=""></div>
                    </div>
                    <div className="grid grid-rows-4 gap-1">
                        <div>{"₩" + targetOrder.orderTotalPrice.toLocaleString()}</div>
                        <div>{targetOrder.paymentStatus}</div>
                        <div>{targetOrder.orderStatus}</div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col pb-8">
                <div className="flex-left text-xl mb-4 border-b border-main-black w-full py-2 bg-white z-20">
                    배송 정보
                </div>
                <div className="text-sm">
                    <Address {...orderAddress} />
                </div>
            </div>
            <div className="flex flex-col pb-2 ">
                <div className="flex-left text-xl mb-2 border-b border-main-black w-full py-2  bg-white z-20">
                    상세 주문 내역
                </div>
                <OrderDetailProductCardArray orderItemList={orderItemList} />
            </div>
            <ProductCheckOut arr={orderItemList} />
            <div
                className="black-bar-xl my-4"
                onClick={() => {
                    scrollToTop();
                    router.back();
                }}>
                확인
            </div>
        </div>
    );
}

const Address = ({
    addressId,
    krName,
    enName,
    customId,
    phone,
    krAddress,
    enAddress,
    krAddressDetail,
    enAddressDetail,
}: userAddressProps) => {
    return (
        <div className="flex flex-col bg-light-gray border border-gray-50 rounded-md shadow p-4 w-full gap-2 mb-3">
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">성 명</div>
                <div className="basis-3/4">
                    {krName}({enName})
                </div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">통관번호</div>
                <div className="basis-3/4">{customId}</div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">휴대폰번호</div>
                <div className="basis-3/4">{phoneNumberAutoFormat(phone)}</div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">한글주소</div>
                <div className="basis-3/4">
                    {krAddress} {krAddressDetail}
                </div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">영문주소</div>
                <div className="basis-3/4">
                    {enAddressDetail} {enAddress}
                </div>
            </div>
        </div>
    );
};
