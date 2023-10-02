import OrderDetailProductCardArray from "./order-product-card-array";
import { phoneNumberAutoFormat } from "@/app/components/custom-input/check-policy";
import { addressFormProps, OrderDetailProps, orderDetailProductCardProps } from "../../type";
import ProductCheckOut from "@/app/cart/component/product-check-out";
import { useRouter } from "next/navigation";

const Address = ({
    addressId,
    krName,
    enName,
    customId,
    phone,
    krAddress,
    enAddress,
    krAddressRest,
    enAddressRest,
}: addressFormProps) => {
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
                    {krAddress} {krAddressRest}
                </div>
            </div>
            <div className="flex w-full">
                <div className="whitespace-nowrap basis-1/4">영문주소</div>
                <div className="basis-3/4">
                    {enAddressRest} {enAddress}
                </div>
            </div>
        </div>
    );
};

const DetailOrder = (targetDetail: OrderDetailProps) => {
    const { orderItemList, orderAddress, ...productInfo } = targetDetail;
    const router = useRouter();
    return (
        <div className="flex flex-col px-3">
            <div className="flex flex-col pb-2 ">
                <div className="flex-left text-2xl mb-8 border-b border-main-black w-full tb:top-[197px] tb:h-[80px] tb:sticky bg-white z-20">
                    상세 주문 정보
                </div>
                <div className="flex justify-between mb-4 ">
                    <div className="flex flex-col gap-2">
                        <div className="">주문번호</div>
                        <div className="">결제일</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>{productInfo.orderId}</div>
                        <div>{productInfo.orderDate}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="">결제금액</div>
                        <div className="">주문상태</div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div>{productInfo.orderPrice}</div>
                        <div>{productInfo.orderStatus}</div>
                    </div>
                </div>
                <div className="flex flex-col pb-8">
                    <div className="text-base pb-2">배송정보</div>
                    <Address {...orderAddress} />
                </div>
            </div>
            <div className="flex flex-col pb-2 ">
                <div className="flex-left text-2xl mb-8 border-b border-main-black w-full tb:top-[197px] tb:h-[80px] tb:sticky bg-white z-20">
                    상세 주문 내역
                </div>
                {orderItemList.map((item: orderDetailProductCardProps, idx) => (
                    <div key={idx}>{OrderDetailProductCardArray([item])}</div>
                ))}
            </div>
            <ProductCheckOut arr={targetDetail.orderItemList} />
            <div className="black-bar-xl" onClick={() => router.back()}>
                확인
            </div>
        </div>
    );
};

export default DetailOrder;
