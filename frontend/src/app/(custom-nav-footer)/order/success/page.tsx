import { redirect } from "next/navigation";
import { getPaymentVerification, confirmPayment, createOrderHistory } from "../component/tosspayments/fetch";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { orderHistoryRequestProps } from "@/app/type";
import PaymentLoading from "./payment-loading";

// 결제 플로우 확인 : captured/keynote/flow

interface searchParamsProps {
    paymentType: string;
    orderId: string;
    paymentKey: string;
    amount: string;
}

export default async function Page({
    params,
    searchParams,
}: {
    params: { pageType: string[] };
    searchParams: searchParamsProps;
}) {
    const session = await getServerSession(options);
    const { paymentType, orderId, paymentKey, amount } = searchParams;

    const { orderTotalPrice } = await getPaymentVerification(orderId, session?.user.accessToken!).then((res) =>
        res.status === 200
            ? res.data
            : redirect("/order/fail?code=FAIL_TO_GET_INFO&message=결제정보를 불러오는데 실패했습니다.")
    );

    if (orderTotalPrice !== Number(amount)) {
        return redirect("/order/fail?code=NOT_MATCH_AMOUNT&message=결제 금액이 일치하지 않습니다.");
    }

    const { status, data } = await confirmPayment(process.env.TOSSPAYMENTS_SECRET_KEY!, paymentKey, amount, orderId);
    // // TODO: error 처리 해야함.

    if (status !== 200) {
        const errorStatus = new URLSearchParams(data).toString();
        return redirect(`/order/fail?${errorStatus}`);
    }

    const orderHistory: orderHistoryRequestProps = {
        paymentKey: data.paymentKey,
        orderId: data.orderId,
        orderedAt: data.approvedAt,
        orderTotalPrice: Number(data.totalAmount),
        paymentMethod: data.method, // 카드, 간편결제
        paymentInfo: data.card.number,
    };

    const { status: historyStatus, data: historyData } = await createOrderHistory(
        orderHistory,
        session?.user.accessToken!
    );

    if (historyStatus !== 200) {
        console.log("---orderHistoryResult.message---");
        console.log(historyStatus);
        console.log(historyData);
        return redirect("/order/fail?code=FAIL_TO_SAVE_INFO&message=결제정보 저장에 실패했습니다.");
    }

    return <PaymentLoading orderId={orderId} />;
}
