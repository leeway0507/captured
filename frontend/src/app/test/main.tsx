"use client";
import { Process, ShippingFee, RefundAndExchange, CustomFee } from "@/app/support/policy/delivery/delivery-component";

const Main = () => {
    return (
        <div className="max-w-xl w-full mx-auto h-full overflow-auto py-8">
            <button className="text-xl font-bold py-4">❮</button>
            <div className="text-2xl font-bold py-4">배송절차</div>
            <div>{Process}</div>
            <div className="text-2xl font-bold py-4">배송비</div>
            <div>{ShippingFee}</div>
            <div className="text-2xl font-bold py-4">교환 및 반품</div>
            <div>{RefundAndExchange}</div>
            <div className="text-2xl font-bold py-4">관부가세 대납</div>
            <div>{CustomFee}</div>
        </div>
    );
};

export default Main;
