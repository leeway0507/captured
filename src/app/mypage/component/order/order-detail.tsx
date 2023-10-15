import OrderDetailProductCardArray from "./order-product-card-array";
import { phoneNumberAutoFormat } from "@/app/components/custom-input/check-policy";
import { userAddressProps, orderHistoryProps, orderDetailProductCardProps } from "@/app/type";
import ProductCheckOut from "@/app/cart/component/product-check-out";
import { useRouter } from "next/navigation";
import * as api from "./fetch-client";
import { useSession } from "next-auth/react";

export default function OrderDetailForm({ orderHistory }: { orderHistory: orderHistoryProps | undefined }) {
    const router = useRouter();
    const { data: session } = useSession();

    if (orderHistory === undefined) return <div>loading...</div>;

    const {
        data: orderAddress,
        error: addErr,
        isLoading: loadingAdd,
    } = api.GetUserAddressInfo(orderHistory.addressId, session?.user.accessToken!);
    const {
        data: orderItemList,
        error: ardErr,
        isLoading: loadingOrd,
    } = api.GetOrderRows(orderHistory.orderId, session?.user.accessToken!);

    if (addErr || ardErr) return <div>failed to load</div>;
    if (loadingAdd || loadingOrd) return <div>loading...</div>;
    if (session === undefined) return <div>loading...</div>;

    return (
        <div className="flex flex-col px-3 ">
            <div className="flex flex-col pb-2 ">
                <div className="flex-left text-2xl mb-8 border-b border-main-black w-full top-0  py-4 sticky bg-white z-20">
                    상세 주문 정보
                </div>
                <div className="flex justify-between mb-4 text-sm-base ">
                    <div className="flex flex-col gap-2">
                        <div className="">주문번호</div>
                        <div className="">결제일</div>
                        <div className="">결제방식</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>{orderHistory.userOrderNumber}</div>
                        <div className="text-xs">
                            {orderHistory.orderedAt.split("T").map((v, idx) => {
                                return <div key={idx}>{v}</div>;
                            })}
                        </div>
                        <div>{orderHistory.paymentMethod}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="">결제금액</div>
                        <div className="">주문상태</div>
                        <div className="">결제상태</div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div>{orderHistory.orderTotalPrice}</div>
                        <div>{orderHistory.orderStatus}</div>
                        <div>{orderHistory.paymentStatus}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col pb-8">
                <div className="flex-left text-2xl mb-8 border-b border-main-black w-full top-0  py-4 sticky bg-white z-20">
                    배송 정보
                </div>
                <Address {...orderAddress} />
            </div>
            <div className="flex flex-col pb-2 ">
                <div className="flex-left text-2xl mb-8 border-b border-main-black w-full top-0  py-4 sticky bg-white z-20">
                    상세 주문 내역
                </div>
                <OrderDetailProductCardArray orderItemList={orderItemList} />
            </div>
            <ProductCheckOut arr={orderItemList} />
            <div
                className="black-bar-xl"
                onClick={() => {
                    router.back(), router.refresh();
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
