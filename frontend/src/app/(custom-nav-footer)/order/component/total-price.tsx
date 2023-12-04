import { cartProductCardProps } from "@/app/type";

const numToKorWon = (x: number) => {
    return "₩ " + x?.toLocaleString("ko-KR");
};

export const CalculateOrderPrice = (arr: cartProductCardProps[]) => {
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

    return {
        orderPrice: numToKorWon(orderPrice),
        domesticShippingFee: numToKorWon(domesticShippingFee),
        intlShippingFee: numToKorWon(intlShippingFee),
        totalShippingFee: numToKorWon(totalShippingFee),
        totalPrice: numToKorWon(totalPrice),
    };
};

export default CalculateOrderPrice;
