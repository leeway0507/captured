import { Fragment, useState } from "react";
import BaseModal from "./base-modal";

interface modalProps {
    toggleName: JSX.Element;
    title: string;
    content: string | JSX.Element;
    buttonClassName?: string;
    trueCallback: () => void;
}

export default function YesNoModal(props: modalProps) {
    const { toggleName, title, content, trueCallback, buttonClassName } = props;

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    function clickYes() {
        trueCallback();
        setIsOpen(false);
    }

    const modalButton = (
        <>
            <button type="button" className="black-bar-modal px-6" onClick={clickYes}>
                예
            </button>
            <button
                type="button"
                className=" bg-light-gray text-main-black px-4 active:text-deep-gray active:bg-gray-200"
                onClick={closeModal}>
                아니오
            </button>
        </>
    );

    return (
        <>
            <>
                <div onClick={openModal} className={`cursor-pointer ${buttonClassName}`}>
                    {toggleName}
                </div>
            </>
            <BaseModal title={title} content={content} closeModal={closeModal} isOpen={isOpen} button={modalButton} />
        </>
    );
}
