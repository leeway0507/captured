"use client";
import AccordionComponent from "@/app/components/accordion/accordion";

export const RefundProcess = (
    <div>
        반품 및 취소정책에 부합하는 주문건에 대해 반품 물품이 고객센터에 도착이후 7일 이내 환불이 진행됩니다. 환불
        금액은 반품 및 취소 건에 대한 배송비를 제외한 나머지 금액이 환불됩니다.
    </div>
);

export const QuestionInfo = (
    <div className="flex flex-col gap-1">
        <div>• 이메일 : {process.env.NEXT_PUBLIC_CUSTOMER_EMAIL}</div>
        <div>
            • 카카오 채널 : <span className="underline">@captured</span> 검색
        </div>
    </div>
);

export const SizeInfo = <div>해외 배송 특성상 재고를 보유하고 있지 않아, 사이즈 안내가 불가합니다. </div>;

const General = () => {
    return (
        <>
            <AccordionComponent
                title="상세 사이즈 문의가 가능한가요?"
                content={SizeInfo}
                cat="sizeInfo"
                titleClassNames="text-base"
            />
            <AccordionComponent
                title="예상 환불 기간이 궁금해요."
                content={RefundProcess}
                cat="refundProcess"
                titleClassNames="text-base"
            />
            <AccordionComponent
                title="직접 문의하고 싶어요."
                content={QuestionInfo}
                cat="questionInfo"
                titleClassNames="text-base"
            />
        </>
    );
};

export default General;
