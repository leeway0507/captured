import BaseModal from "./base-modal";
import { useState } from "react";

interface alertModalProps {
    children: React.ReactNode;
    title: string;
    content: string;
    buttonClassName?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function AlertModal(props: alertModalProps) {
    const { children, title, content, buttonClassName = "", isOpen, setIsOpen } = props;

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    const modalButton = (
        <button type="button" className="rounded-md black-bar w-full " onClick={closeModal}>
            확인
        </button>
    );

    return (
        <>
            <>
                <div onClick={openModal} className={buttonClassName}>
                    {children}
                </div>
            </>

            <BaseModal title={title} content={content} closeModal={closeModal} isOpen={isOpen} button={modalButton} />
        </>
    );
}
