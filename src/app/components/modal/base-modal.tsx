"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface baseModalProps {
    title: string;
    content: string | JSX.Element;
    isOpen: boolean;
    closeModal: () => void;
    button: JSX.Element;
}

const BaseModal = (props: baseModalProps) => {
    const { title, closeModal, isOpen, content, button } = props;
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-[350px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle border border-deep-gray shadow-2xl transition-all">
                                <Dialog.Title as="h3" className="text-lg leading-6 text-gray-900">
                                    {title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="text-sm text-gray-500 pb-4">{content}</div>
                                </div>

                                <div className="flex gap-3">{button}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default BaseModal;
