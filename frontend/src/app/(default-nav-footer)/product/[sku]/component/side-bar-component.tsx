"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const DeliverySideBar = ({
    content,
    isOpen,
    closeModal,
}: {
    content: JSX.Element;
    isOpen: boolean;
    closeModal: () => void;
}) => {
    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="opacity-0 duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-30 h-full" />
                    </Transition.Child>

                    <div className="fixed top-0 right-0 h-full">
                        <div className="flex h-full w-full max-w-[1440px]">
                            <Transition.Child
                                as={Fragment}
                                enter="transition duration-500 ease-out transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition duration-500 ease-out transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full">
                                <Dialog.Panel className="h-full w-full max-w-[500px] transform overflow-hidden bg-white border border-deep-gray shadow-2xl transition-all">
                                    <div className="mx-auto overflow-auto h-full">{content}</div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default DeliverySideBar;
