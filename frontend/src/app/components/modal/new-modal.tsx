"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useShoppingCart } from "../context/shopping-cart-context";

export const ButtonModal = ({
    btnClassName,
    btnContent,
    modalContent,
}: {
    btnClassName: string;
    btnContent: string | JSX.Element;
    modalContent: string | JSX.Element;
}) => {
    const handler = PopUpModal(modalContent);
    return (
        <div className="w-full h-full flex-center">
            <button onClick={handler} className={`${btnClassName}`}>
                {btnContent}
            </button>
        </div>
    );
};

export function PopUpModal(modalContent: string | JSX.Element) {
    const { setModalOpen, setModalContent } = useShoppingCart();
    const handleModal = () => {
        setModalOpen(true);
        setModalContent(modalContent);
    };
    return handleModal;
}

const BaseModal = () => {
    const { isModalOpen, setModalOpen, modalContent, setModalContent } = useShoppingCart();
    const closeModal = () => {
        setModalOpen(false);
        setModalContent("No Modal");
    };
    return (
        isModalOpen && (
            <Transition appear show={true} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter=""
                        enterFrom=""
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-60" />
                    </Transition.Child>

                    <div className="fixed left-0 right-0 top-[20%] tb:top-[30%] overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter=""
                                enterFrom=""
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-80">
                                <Dialog.Panel className="w-full max-w-[380px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all">
                                    {modalContent}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        )
    );
};

export default BaseModal;
