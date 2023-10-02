import BaseModal from "./base-modal";
import { useState } from "react";

interface alertModalProps {
    title: string;
    content: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    checkColor?: "black" | "green" | "red";
    trueCallback?: () => void;
}

export default function AlertModalWithoutBtn(props: alertModalProps) {
    const { title, content, checkColor, isOpen, setIsOpen, trueCallback } = props;

    function closeModal() {
        trueCallback && trueCallback();
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    const modalButton = (
        <button
            type="button"
            className={`rounded-md black-bar w-full ${
                checkColor === "red"
                    ? "bg-rose-700 text-light-gray"
                    : checkColor === "green" && "bg-green-600 text-light-gray"
            }}`}
            onClick={closeModal}>
            확인
        </button>
    );

    return (
        <>
            <BaseModal title={title} content={content} closeModal={closeModal} isOpen={isOpen} button={modalButton} />
        </>
    );
}
