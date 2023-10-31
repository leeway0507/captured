import AccordionComponent from "@/app/components/accordion/accordion";
// import { Process, ShippingFee, RefundAndExchange, CustomFee } from "./faq-component";

function setDefaultPadding(node: React.ReactNode | JSX.Element) {
    return <div className="px-4">{node}</div>;
}

const main = "text-3xl font-bold mb-4 w-full flex-center";
export default function Main() {
    return (
        <div className="max-w-2xl w-full pt-4 pb-16 px-8 text-sm mx-auto flex-left flex-col">
            <div className={`${main} me-8`}>자주 묻는 질문</div>
            <div className="w-full max-w-xl h-full">
                <div className="text-xl font-bold pt-4 pb-2">일반</div>
                <AccordionComponent
                    title="해외 배송과 국내 배송 차이가 궁금해요."
                    content={`test`}
                    cat="shipmment"
                    titleClassNames="text-base"
                />
                <AccordionComponent
                    title="취소 및 환불 절차가 궁금해요."
                    content={`test`}
                    cat="refundProcess"
                    titleClassNames="text-base"
                />
                <AccordionComponent
                    title="예상 환불 기간이 궁금해요."
                    content={`test`}
                    cat="process"
                    titleClassNames="text-base"
                />

                <div className="text-xl font-bold pt-4 pb-2">일반</div>
                <AccordionComponent
                    title="아직 배송받지 못했어요."
                    content={`test`}
                    cat="shippingFee"
                    titleClassNames="text-base"
                />
                <AccordionComponent
                    title="최대 구매 수량이 있나요?"
                    content={`test`}
                    cat="refundAndExchange"
                    titleClassNames="text-base"
                />
                <AccordionComponent
                    title="관부가세 대납이 가능한가요?"
                    content={`test`}
                    cat="customFee"
                    titleClassNames="text-base"
                />
                <AccordionComponent
                    title="묶음 배송이 가능한가요?"
                    content={`test`}
                    cat="customFee"
                    titleClassNames="text-base"
                />
                <div className="text-xl font-bold pt-4 pb-2">일반</div>
                <AccordionComponent
                    title="직접 문의하고 싶어요."
                    content={`test`}
                    cat="customInfo"
                    titleClassNames="text-base"
                />
                <AccordionComponent
                    title="상세 사이즈 정보가 궁금해요."
                    content={`test`}
                    cat="sizeInfo"
                    titleClassNames="text-base"
                />
            </div>
        </div>
    );
}
