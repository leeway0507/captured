import AccordionComponent from "@/app/components/accordion/accordion";
import { Process, ShippingFee, RefundAndExchange, CustomFee } from "./delivery-component";

function setDefaultPadding(node: React.ReactNode | JSX.Element) {
    return <div className="px-4">{node}</div>;
}

const main = "text-4xl font-bold mb-4 w-full flex-center";
export default function Main() {
    return (
        <div className="max-w-2xl w-full pt-4 pb-16 px-8 text-sm mx-auto flex-left flex-col">
            <div className={`${main} me-8`}>배송안내</div>
            <div className="w-full max-w-xl h-full">
                <AccordionComponent title="배송절차" content={setDefaultPadding(Process)} cat="process" />
                <AccordionComponent title="배송비" content={setDefaultPadding(ShippingFee)} cat="shippingFee" />
                <AccordionComponent
                    title="교환 및 반품"
                    content={setDefaultPadding(RefundAndExchange)}
                    cat="refundAndExchange"
                />
                <AccordionComponent title="관부가세 대납" content={setDefaultPadding(CustomFee)} cat="customFee" />
            </div>
        </div>
    );
}
