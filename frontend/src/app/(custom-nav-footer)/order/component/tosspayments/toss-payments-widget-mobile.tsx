"use client";
import { useRef, useEffect } from "react";
import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { User, cartProductCardProps, orderRowRequestProps } from "@/app/type";
import { setPaymentVerification } from "./fetch";
import useSizeDetect from "@/app/components/hook/use-size-detect-hook";
// 결제 플로우 확인 : captured/keynote/flow

export default function TossPaymentsWidget({
    price,
    userInfo,
    addressId,
    arr,
}: {
    price: number;
    userInfo: User;
    addressId: string;
    arr: cartProductCardProps[];
}) {
    const clientKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_CLIENT_KEY!;

    const orderLength = arr.length;
    const productName = arr[0].productName;

    const order = productName.length > 20 ? productName.slice(0, 17) + "..." : productName;
    const orderName = order + (orderLength > 1 ? ` 외 ${orderLength - 1}건` : "");

    const orderId = nanoid();

    const orderRows: orderRowRequestProps[] = arr.map((item) => {
        return {
            orderId: orderId,
            sku: item.sku,
            size: item.size,
            quantity: item.quantity,
        };
    });

    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);

    useEffect(() => {
        (async () => {
            // ------  결제위젯 초기화 ------
            // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
            const paymentWidget = await loadPaymentWidget(clientKey, userInfo.userId); // 회원 결제

            // ------  결제위젯 렌더링 ------
            // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
            const paymentMethodsWidget = paymentWidget.renderPaymentMethods("#payment-widget", { value: price });

            // ------  이용약관 렌더링 ------
            // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
            paymentWidget.renderAgreement("#agreement");

            paymentWidgetRef.current = paymentWidget;
            paymentMethodsWidgetRef.current = paymentMethodsWidget;
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { maxHeight, innerHeight } = useSizeDetect();

    if (arr === undefined) return null;

    return (
        <>
            <div className="pb-16">
                <div id="payment-widget" className="w-full" />
                <div id="agreement" className="w-full" />
            </div>
            <div
                className={`${
                    maxHeight > 0 && maxHeight == innerHeight ? "h-[120px] pb-[30px]" : "h-[100px]"
                }  bg-white fixed left-0 bottom-0 px-4  flex px-4 gap-4 w-full  border-t-2 items-center justify-between z-10`}>
                <div className="flex flex-col basis-1/5">
                    <div className="text-sm text-left">총 결제금액</div>
                    <div>{"₩" + price.toLocaleString()}</div>
                </div>

                <button
                    className="black-bar-xl tracking-[0.2em] w-full px-4 py-4"
                    onClick={async () => {
                        const paymentWidget = paymentWidgetRef.current;

                        // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                        // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보

                        await setPaymentVerification(orderId, addressId, price, orderRows, userInfo.accessToken);
                        await paymentWidget
                            ?.requestPayment({
                                orderId: orderId,
                                orderName: orderName,
                                customerName: userInfo.krName,
                                customerEmail: userInfo.email && userInfo.email,
                                // SUCCESS : https://{ORIGIN}/success?paymentKey={PAYMENT_KEY}&orderId={ORDER_ID}&amount={AMOUNT}&paymentType={PAYMENT_TYPE}
                                successUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order/success`,
                                // FAIL : https://{ORIGIN}/fail?code={ERROR_CODE}&message={ERROR_MESSAGE}&orderId={ORDER_ID}
                                failUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order/fail`,
                            })
                            .catch(function (error) {
                                if (error.code === "INVALID_ORDER_NAME") {
                                    alert(error.message);
                                } else if (error.code === "INVALID_ORDER_ID") {
                                    alert(error.message);
                                }
                            });
                    }}>
                    결제하기
                </button>
            </div>
        </>
    );
}
