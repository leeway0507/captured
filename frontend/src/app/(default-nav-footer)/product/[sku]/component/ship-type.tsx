"use client";
import { IntlShipment, DomeShipment } from "@/app/components/notification/shipment-info";
const ShipType = ({ intl }: { intl: boolean }) => {
    return intl ? (
        <IntlShipment title="해외배송 상품" content="영업일 기준 5-15일의 배송기간이 소요됩니다." />
    ) : (
        <DomeShipment title="국내배송 상품" content="영업일 기준  1-3일의 배송기간이 소요됩니다." />
    );
};

export default ShipType;
