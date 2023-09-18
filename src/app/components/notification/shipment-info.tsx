import Image from "next/image";

interface IntlShipmentProps {
    content: string;
}

export function IntlShipment({ content }: IntlShipmentProps) {
    return (
        <div className="bg-light-gray text-sub-black">
            <div className="flex">
                <div className="flex-center basis-1/4">
                    <Image src="/icons/intl-shipment.svg" width={26} height={26} alt="intl-shipment" />
                </div>
                <div className="basis-3/4">
                    <div className="flex flex-col px-2 my-2 border-s-2 border-sub-black">
                        <div className="text-base tb:text-lg my-1">해외배송 상품</div>
                        <p className="text-[0.1em] tb:text-sm text-justify">{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DomeShipment() {
    return (
        <div className="bg-light-gray h-full p-2">
            <div className="flex">
                <div className="flex-center basis-1/4">
                    <Image src="/icons/dome-shipment.svg" width={20} height={20} alt="dome-shipment" />
                </div>
                <div className="basis-3/4 px-2 border-s-2 border-sub-black">
                    <div className="flex-center flex-col px-2 py-1">
                        <div>국내배송 상품</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
