import OrderProducts from "@/app/order/component/product-card-array";
import { phoneNumberAutoFormat } from "@/app/components/custom-input/check-policy";
import Link from "next/link";
import { productCardProps } from "@/app/type";
import { addressFormProps, targetDetailProps } from "../../type";

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

const detailOrder = (targetDetail: targetDetailProps) => {
    const { orderItemList, orderAddress, ...productInfo } = targetDetail;
    return (
        <div className="flex flex-col">
            <div className="flex flex-col pb-2 px-5">
                <div className="flex-left text-2xl mb-8 border-b sticky border-main-black top-[247px] h-[50px] bg-white">
                    주문 정보
                </div>
                <div className="flex justify-between mb-4 ">
                    <div className="flex flex-col gap-2">
                        <div className="">주문번호</div>
                        <div className="">결제일</div>
                        <div className="">배송사</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>{productInfo.orderId}</div>
                        <div>{productInfo.orderDate}</div>
                        <div>{productInfo.deliveryCompany}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="">결제금액</div>
                        <div className="">주문상태</div>
                        <div className="">운송장번호</div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div>{productInfo.orderPrice}</div>
                        <div>{productInfo.orderStatus}</div>
                        <Link href={"/"} className="hover:text-blue-400 underline">
                            {productInfo.deliveryNumber}
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col pb-8">
                    <div className="text-base pb-2">배송정보</div>
                    <Address {...orderAddress} />
                </div>
            </div>
            <div className="flex-left text-2xl mx-5 mb-8 border-b sticky border-main-black top-[247px] h-[50px] bg-white">
                주문 내역
            </div>
            {orderItemList.map((item: productCardProps, idx) => (
                <div key={idx}>{OrderProducts([item])}</div>
            ))}
        </div>
    );
};

export default detailOrder;
