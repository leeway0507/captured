import { PopUpModal } from "./new-modal";
import { useShoppingCart } from "../context/shopping-cart-context";
import Image from "next/image";

const AlertForm = (
    title: string,
    content: string | JSX.Element,
    buttonClass: string,
    callBack: CallableFunction,
    buttonName?: string
) => {
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
                    <Image src={"/icons/white/x-mark-white.svg"} alt="x-mark" width="20" height="20" priority />
                </div>
            </div>
            <div className="text-sub-black">{content}</div>
            <div className="flex gap-4">
                <button className={`${buttonClass}`} onClick={ConfirmHandler}>
                    {buttonName ?? "확인"}
                </button>
            </div>
        </div>
    );
};

export const AlertPopUpModal = (
    title: string,
    content: string | JSX.Element,
    buttonClass: string,
    callBack: CallableFunction,
    buttonName?: string
) => {
    return PopUpModal(AlertForm(title, content, buttonClass, callBack, buttonName));
};
