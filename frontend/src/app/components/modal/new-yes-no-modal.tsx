"use client";
import { PopUpModal } from "./new-modal";
import { useShoppingCart } from "../context/shopping-cart-context";
import Image from "next/image";

const ConfirmForm = (title: string, content: string | JSX.Element, callBack: CallableFunction) => {
    const { setModalOpen } = useShoppingCart();

    const ConfirmHandler = () => {
        callBack();
        setModalOpen(false);
    };
    const CancelHandler = () => {
        setModalOpen(false);
    };

    return (
        <div className="flex flex-col w-full max-w-[380px] overflow-hidden bg-white text-left align-middle">
            <div className="flex justify-between content-center">
                <div className="text-md text-main-black">{title}</div>
                <div className="flex items-end" onClick={CancelHandler}>
                    <Image src={"/icons/x-mark.svg"} alt="x-mark" width="20" height="20" priority />
                </div>
            </div>
            <div className="text-sub-black">{content}</div>
            <div className="flex gap-4">
                <button className="px-5 py-3 black-bar" onClick={ConfirmHandler}>
                    예
                </button>
                <button className="px-5 py-3 black-bar bg-light-gray text-main-black " onClick={CancelHandler}>
                    아니오
                </button>
            </div>
        </div>
    );
};

export const ConfirmPopUpModal = (title: string, content: string | JSX.Element, callBack: CallableFunction) => {
    return PopUpModal(ConfirmForm(title, content, callBack));
};
