import { Process, ShippingFee, RefundAndExchange, CustomFee } from "@/app/support/policy/delivery/delivery-component";

const DeliveryInfo = ({ closeModal }: { closeModal: () => void }) => {
    return (
        <div>
            <div className="max-w-xl w-full mx-auto h-full overflow-auto py-8">
                <button className="w-full flex-right text-xl font-bold py-1" onClick={closeModal}>
                    ✕
                </button>
                <div className="text-2xl font-bold flex-center pt-4 pb-8">배송 및 반품 안내사항</div>
                <div className="text-xl font-bold pb-1">배송절차</div>
                <div>{Process}</div>
                <div className="text-xl font-bold pt-8 pb-1">배송비</div>
                <div>{ShippingFee}</div>
                <div className="text-xl font-bold pt-8 pb-1">관부가세</div>
                <div>{CustomFee}</div>
                <div className="text-xl font-bold pt-8 pb-1">반품 및 환불 </div>
                <div>{RefundAndExchange}</div>
            </div>
        </div>
    );
};

export default DeliveryInfo;
