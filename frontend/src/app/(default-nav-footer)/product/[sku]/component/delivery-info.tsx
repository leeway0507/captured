import {
    Process,
    ShippingFee,
    RefundAndExchange,
    CustomFee,
} from "@/app/(default-nav-footer)/support/faq/delivery-info";

const boxClass = "bg-light-gray opacity-80 rounded-md border border-deep-gray p-3";

const DeliveryInfo = ({ closeModal }: { closeModal: () => void }) => {
    return (
        <div>
            <div className="max-w-xl w-full h-full py-8 px-4">
                <div className="sticky top-0 flex justify-between items-center py-3 bg-white z-20">
                    <div className="text-xl font-bold whitespace-nowrap">배송 및 반품 안내사항</div>
                    <button onClick={closeModal}>✕</button>
                </div>
                <div className="text-xl font-bold pb-1 ">배송절차</div>
                <div className={`${boxClass}`}>{Process}</div>
                <div className="text-xl font-bold pt-8 pb-1">배송비</div>
                <div className={`${boxClass}`}>{ShippingFee}</div>
                <div className="text-xl font-bold pt-8 pb-1">관부가세</div>
                <div className={`${boxClass}`}>{CustomFee}</div>
                <div className="text-xl font-bold pt-8 pb-1">반품 및 환불 </div>
                <div className={`${boxClass}`}>{RefundAndExchange}</div>
            </div>
        </div>
    );
};

export default DeliveryInfo;
