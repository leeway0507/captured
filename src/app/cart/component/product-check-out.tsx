import type { cartProductCardProps } from "../type";

type ProductCardArray = {
    ProductCardArray: cartProductCardProps[];
};

export default function ProductCheckOut({ ProductCardArray }: ProductCardArray) {
    const orderPrice = ProductCardArray.reduce((result, item) => {
        return result + item.price * item.quantity;
    }, 0);

    const domesticShippingFee = ProductCardArray.reduce((result, item) => {
        return result + (item.intl ? 0 : item.shippingFee * item.quantity);
    }, 0);

    const intlShippingFee = ProductCardArray.reduce((result, item) => {
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
            <div className="m-3 bg-black active:bg-white text-xl py-2 flex-center">
                <div className="text-light-gray active:text-black tracking-[0.2em]">주문하기</div>
            </div>
        </div>
    );
}
