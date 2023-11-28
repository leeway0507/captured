"use client";
import { PopUpModal } from "./new-modal";
import { useShoppingCart } from "../context/shopping-cart-context";

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
        <div className="flex flex-col gap-4 w-full max-w-[380px] overflow-hidden bg-white text-left align-middle">
            <div className="flex justify-between content-center">
                <div className="text-md text-main-black">{title}</div>
                <button className="text-sm flex-right text-gray-600" onClick={CancelHandler}>
                    X
                </button>
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
