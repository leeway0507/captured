import { Fragment, useState } from "react";
import BaseModal from "./base-modal";
import YesNoModalWithoutBtn from "./yes-no-modal-without-btn";

interface modalProps {
    toggleName: JSX.Element | string;
    title: string;
    content: string | JSX.Element;
    buttonClassName?: string;
    trueCallback: () => void;
}

export default function YesNoModal(props: modalProps) {
    const { toggleName, title, content, trueCallback, buttonClassName } = props;

    let [isOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <>
                <div onClick={openModal} className={`cursor-pointer ${buttonClassName}`}>
                    {toggleName}
                </div>
            </>
            <YesNoModalWithoutBtn
                title={title}
                content={content}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                trueCallback={trueCallback}
            />
        </>
    );
}
