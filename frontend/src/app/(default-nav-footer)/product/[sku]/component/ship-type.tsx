"use client";
import { IntlShipment, DomeShipment } from "@/app/components/notification/shipment-info";
const intlContent = (
    <>
        <div className="py-2">
            <div>도착 예정일 : 영업일 기준 5-15일 이내</div>
        </div>

        <div>
            <div>배송비</div>
            <div className="pt-1 ps-1 flex flex-col gap-1">
                <div>• 가방, 악세서리, 모자 : 15,000원</div>
                <div>• 반팔, 긴팔, 셔츠, 바지, 반바지 : 15,000원</div>
                <div>• 가디건, 코트, 패딩, 후리스 : 19,000원</div>
                <div>• 신발 : 19,000원</div>
            </div>
        </div>
    </>
);
const domeContent = (
    <>
        <div className="py-2">
            <div>도착 예정일 : 영업일 기준 1-3일 이내</div>
        </div>
        <div>배송비 : 3,000원</div>
    </>
);
const ShipType = ({ intl }: { intl: boolean }) => {
    return intl ? (
        <IntlShipment title="해외배송 상품" content={intlContent} />
    ) : (
        <DomeShipment title="국내배송 상품" content={domeContent} />
    );
};

export default ShipType;
