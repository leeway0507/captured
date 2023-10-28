"use client";
import Image from "next/image";
interface ShipmentProps {
    title: string;
    content: JSX.Element | string;
}

export function IntlShipment({ title, content }: ShipmentProps) {
    return (
        <div className="bg-light-gray text-sub-black tracking-tightest rounded	">
            <div className="flex">
                <div className="flex-center basis-1/4">
                    <Image src="/icons/intl-shipment.svg" width={32} height={32} alt="intl-shipment" />
                </div>
                <div className="basis-3/4">
                    <div className="flex flex-col px-2 my-3 py-2 border-s-2 border-sub-black">
                        <div className="mx-1 text-lg my-1">{title}</div>
                        <div className="mx-1 tracking-[0.2rem] text-sm text-justify  tracking-tight">{content}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DomeShipment({ title, content }: ShipmentProps) {
    return (
        <div className="bg-light-gray text-sub-black tracking-tightest rounded-lg  ">
            <div className="flex">
                <div className="flex-center basis-3/12">
                    <Image src="/icons/dome-shippment.svg" width={28} height={28} alt="dome-shipment" />
                </div>
                <div className="basis-3/4">
                    <div className="flex flex-col px-2 my-3 py-2 border-s-2 border-sub-black">
                        <div className="mx-1 text-lg font-bold">{title}</div>
                        <div className="mx-1 tracking-[0.2rem] text-sm text-justify  tracking-tight">{content}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
