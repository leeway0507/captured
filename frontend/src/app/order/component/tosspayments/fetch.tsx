import { setBackendEnvAPI } from "@/app/components/utils/env-utiils";
import { orderHistoryRequestProps, orderRowRequestProps } from "@/app/type";

export async function setPaymentVerification(
    orderId: string,
    addressId: string,
    amount: number,
    arr: orderRowRequestProps[],
    accessToken: string
) {
    await fetch(`${setBackendEnvAPI()}/api/order/save-order-info-before-payment`, {
        method: "POST",
        headers: {
            Authorization: `bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderId,
            addressId,
            orderTotalPrice: amount,
            orderRows: arr,
        }),
    });
}

export async function getPaymentVerification(OrderId: string, accessToken: string) {
    const response = await fetch(`${setBackendEnvAPI()}/api/order/get-order-info-before-payment?orderId=${OrderId}`, {
        method: "GET",
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    return data;
}

export async function confirmPayment(secretKey: string, paymentKey: string, amount: string, orderId: string) {
    const response = await fetch(`https://api.tosspayments.com/v1/payments/confirm`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${secretKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            paymentKey,
            amount,
            orderId,
        }),
    });

    return { status: response.status, data: await response.json() };
}

export async function createOrderHistory(orderHistory: orderHistoryRequestProps, accessToken: string) {
    const response = await fetch(`${setBackendEnvAPI()}/api/order/create-order-history`, {
        method: "POST",
        headers: {
            Authorization: `bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderHistory),
    });

    return { status: response.status, data: await response.json() };
}
