"use client";
import { useState } from "react";
import SideBar from "./side-bar-component";
import DeliveryInfo from "./delivery-info";
import SizeInfo from "./size-info";

const Infos = () => {
    const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
    const [isSizeOpen, setIsSizeOpen] = useState(false);

    const closeDeliveryModal = () => {
        setIsDeliveryOpen(false);
    };
    const closeSizeModal = () => {
        setIsSizeOpen(false);
    };

    return (
        <>
            <div className="flex flex-col w-full gap-2">
                <button
                    className="text-main-black ps-1 pe-4 flex justify-between w-full text-xl font-bold link-animation"
                    onClick={() => setIsDeliveryOpen(true)}>
                    <div>배송 및 반품 안내</div>
                    <div>❯</div>
                </button>
                <button
                    className="text-main-black ps-1 pe-4 flex justify-between w-full text-xl font-bold link-animation"
                    onClick={() => setIsSizeOpen(true)}>
                    <div>제품 사이즈 안내 </div>
                    <div>❯</div>
                </button>
            </div>
            <SideBar
                content={<DeliveryInfo closeModal={closeDeliveryModal} />}
                isOpen={isDeliveryOpen}
                closeModal={closeDeliveryModal}
            />
            <SideBar
                content={<SizeInfo closeModal={closeSizeModal} />}
                isOpen={isSizeOpen}
                closeModal={closeSizeModal}
            />
        </>
    );
};

export default Infos;
