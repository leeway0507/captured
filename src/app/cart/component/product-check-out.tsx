import { cartProductCardProps } from "../../type";

export default function ProductCheckOut({ arr }: { arr: cartProductCardProps[] }) {
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

    return (
        <div className="flex flex-col border-sub-black pt-6 justify-between">
            <div className="flex flex-col px-2">
                <div className="flex justify-between pb-1">
                    <div>주문금액</div>
                    <div>{numToKorWon(orderPrice)}</div>
                </div>

                <div className="flex flex-col pb-2">
                    <div className="flex justify-between">
                        <div className="flex-center">총 배송비</div>
                        <div>{numToKorWon(totalShippingFee)}</div>
                    </div>

                    {intlShippingFee > 0 ? (
                        <div className="flex justify-between text-sm text-blue-black ps-1">
                            <div>해외배송</div>
                            <div>{numToKorWon(intlShippingFee)}</div>
                        </div>
                    ) : (
                        ""
                    )}
                    {domesticShippingFee > 0 ? (
                        <div className="flex justify-between text-sm text-blue-black ps-1 ">
                            <div>국내배송</div>
                            <div>{numToKorWon(domesticShippingFee)}</div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="flex justify-between text-xl py-2 pb-">
                    <div>최종결제금액</div>
                    <div>{numToKorWon(totalPrice)}</div>
                </div>
            </div>
        </div>
    );
}
