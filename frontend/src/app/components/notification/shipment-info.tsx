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
                <div className="flex-center basis-1/5">
                    <Image src="/icons/intl-shipment.svg" width={32} height={32} alt="intl-shipment" />
                </div>
                <div className="basis-4/5">
                    <div className="flex flex-col px-2 my-3 py-2 border-s-2 border-sub-black">
                        <div className="mx-1 text-lg my-1 font-bold">{title}</div>
                        <div className="mx-1 tracking-[0.2rem] text-sm text-justify  tracking-tight">{content}</div>
                        <div>
                            <div className="font-bold pt-4">해당 상품이 정품임을 보증합니다.</div>
                            <div className="text-sm">구매 상품이 가품일 경우, 구매가의 2배를 보상합니다.</div>
                        </div>
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
                <div className="flex-center basis-1/5">
                    <Image src="/icons/dome-shippment.svg" width={28} height={28} alt="dome-shipment" />
                </div>
                <div className="basis-4/5">
                    <div className="flex flex-col px-2 my-3 py-2 border-s-2 border-sub-black">
                        <div className="mx-1 text-lg font-bold">{title}</div>
                        <div className="mx-1 tracking-[0.2rem] text-sm text-justify  tracking-tight">{content}</div>
                        <div>
                            <div className="font-bold pt-4">해당 상품이 정품임을 보증합니다.</div>
                            <div className="text-sm">구매 상품이 가품일 경우, 구매가의 2배를 보상합니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
