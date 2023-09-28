import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface modalProps {
    title: string;
    content: string | JSX.Element;
    trueCallback: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function YesNoModalWithoutBtn({ title, content, trueCallback, isOpen, setIsOpen }: modalProps) {
    function closeModal() {
        setIsOpen(false);
    }

    function clickYes() {
        trueCallback();
        setIsOpen(false);
    }

    return (
        <>
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
                                <Dialog.Panel className="w-full max-w-[400px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle border border-deep-gray shadow-2xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg leading-6 text-gray-900">
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="text-sm text-gray-500">{content}</div>
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <button type="button" className="black-bar px-6 py-2" onClick={clickYes}>
                                            예
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-light-gray px-4 py-2 active:text-deep-gray active:bg-gray-200"
                                            onClick={closeModal}>
                                            아니오
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
