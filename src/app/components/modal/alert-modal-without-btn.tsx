import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface alertModalProps {
    title: string;
    content: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    trueCallback?: () => void;
    checkColor?: "black" | "green" | "red";
}

export default function AlertModalWithoutBtn({
    title,
    content,
    isOpen,
    setIsOpen,
    trueCallback = () => {},
    checkColor = "black",
}: alertModalProps) {
    function closeModal() {
        setIsOpen(false);
    }

    function clickYes() {
        setIsOpen(false);
        trueCallback();
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
                                <Dialog.Panel className="w-full max-w-[400px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle border border-deep-gray shadow-2xl transition-all max-w-[300px]">
                                    <Dialog.Title as="h3" className="text-lg leading-6 text-gray-900">
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{content}</p>
                                    </div>

                                    <div className="flex-center pt-4">
                                        <button
                                            type="button"
                                            className={`rounded-md black-bar w-full ${
                                                checkColor === "red"
                                                    ? "bg-rose-700 text-light-gray"
                                                    : checkColor === "green" && "bg-green-600 text-light-gray"
                                            }}`}
                                            onClick={clickYes}>
                                            확인
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
