import Image from "next/image";

interface IntlShipmentProps {
    content: string;
}

export function IntlShipment({ content }: IntlShipmentProps) {
    return (
        <div className="bg-light-gray text-sub-black tracking-tightest rounded	">
            <div className="flex">
                <div className="flex-center basis-1/4">
                    <Image src="/icons/intl-shipment.svg" width={32} height={32} alt="intl-shipment" />
                </div>
                <div className="basis-3/4">
                    <div className="flex flex-col px-2 my-3 pt-2 pb-5 border-s-2 border-sub-black">
                        <div className="mx-1 text-xl my-1">해외배송 상품</div>
                        <p className="mx-1 text-sm text-justify pe-2 tracking-tight	">{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DomeShipment() {
    return (
        <div className="bg-light-gray text-sub-black tracking-tightest rounded	">
            <div className="flex">
                <div className="flex-center basis-1/4">
                    <Image src="/icons/dome-shippment.svg" width={28} height={28} alt="dome-shipment" />
                </div>
                <div className="basis-3/4">
                    <div className="flex flex-col px-2 my-3 py-2 border-s-2 border-sub-black">
                        <div className="mx-1 text-xl my-1">국내배송 상품</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
