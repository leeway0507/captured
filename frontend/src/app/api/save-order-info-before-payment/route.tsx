import { orderRowRequestProps } from "@/app/type";
import { NextResponse } from "next/server";

async function setPaymentVerification(request: Request) {
    const { orderId, addressId, amount, arr, accessToken } = await request.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/save-order-info-before-payment`, {
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

    return NextResponse.json({ status: res.status, data: await res.json() });
}

export { setPaymentVerification as POST };
