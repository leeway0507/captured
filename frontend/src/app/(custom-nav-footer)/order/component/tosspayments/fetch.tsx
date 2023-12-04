import { orderHistoryRequestProps, orderRowRequestProps } from "@/app/type";

export async function setPaymentVerificationProxy(
    orderId: string,
    addressId: string,
    amount: number,
    arr: orderRowRequestProps[],
    accessToken: string
) {
    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const res = await fetch(`${dynamicUrl}/api/save-order-info-before-payment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderId,
            addressId,
            amount,
            arr,
            accessToken,
        }),
    });

    return { status: res.status, data: await res.json() };
}

export async function getPaymentVerification(OrderId: string, accessToken: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/get-order-info-before-payment?orderId=${OrderId}`,
        {
            method: "GET",
            headers: {
                Authorization: `bearer ${accessToken}`,
            },
        }
    );

    return { status: response.status, data: await response.json() };
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/create-order-history`, {
        method: "POST",
        headers: {
            Authorization: `bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderHistory),
    });

    return { status: response.status, data: await response.json() };
}
