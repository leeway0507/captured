import { cartProductCardProps } from "../../../type";

export default function ProductCheckOut({ arr }: { arr: cartProductCardProps[] }) {
    const orderPrice = arr?.reduce((result, item) => {
        return result + item.price * item.quantity;
    }, 0);

    const domesticShippingFee = arr?.reduce((result, item) => {
        return result + (item.intl === false ? item.shippingFee * item.quantity : 0);
    }, 0);

    const intlShippingFee = arr?.reduce((result, item) => {
        return result + (item.intl === true ? item.shippingFee * item.quantity : 0);
    }, 0);

    const totalShippingFee = domesticShippingFee + intlShippingFee;
    const totalPrice = orderPrice + totalShippingFee;

    function numToKorWon(x: number) {
        return "₩ " + x?.toLocaleString("ko-KR");
    }

    const accordionClass = () => {
        const base =
            "peer absolute -top-[0.5rem] left-[2.3rem] p-4 z-10 checked:accent-slate-200 rotate-90 bg-transparent border-0 ring-0";
        const checked =
            "checked:bg-none checked:bg-transparent checked:rotate-90 checked:ring-0 checked:border-0 checked:text-transparent ";
        const focus =
            "focus:border-transparent focus:ring-shadow-0 focus:ring-transparent focus:ring-offset-transparent";

        return base + " " + checked + " " + focus;
    };

    return (
        <div className="flex flex-col border-sub-black justify-between text-sm">
            <div className="flex flex-col ">
                <div className="flex justify-between pb-1">
                    <div>물품가격</div>
                    <div>{numToKorWon(orderPrice)}</div>
                </div>

                <div className="flex flex-col relative">
                    <div className="flex justify-between">
                        <div className="flex-center">배송비</div>
                        <div>{numToKorWon(totalShippingFee)}</div>
                    </div>

                    <input type="checkbox" id="price-detail" className={`${accordionClass()}`} />
                    <label
                        htmlFor="price-detail"
                        className="peer-checked:rotate-90 absolute left-[2.7rem] top-[0.1rem] text-xs flex-center">
                        ❯
                    </label>

                    <div className="peer-checked:block hidden">
                        {intlShippingFee > 0 ? (
                            <div className="flex justify-between text-xs text-gray-400 pt-1">
                                <div>해외배송</div>
                                <div>{numToKorWon(intlShippingFee)}</div>
                            </div>
                        ) : (
                            ""
                        )}
                        {domesticShippingFee > 0 ? (
                            <div className="flex justify-between text-xs text-gray-400 pt-1">
                                <div>국내배송</div>
                                <div>{numToKorWon(domesticShippingFee)}</div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className="flex justify-between text-base py-2">
                    <div>총 결제금액</div>
                    <div>{numToKorWon(totalPrice)}</div>
                </div>
            </div>
        </div>
    );
}
