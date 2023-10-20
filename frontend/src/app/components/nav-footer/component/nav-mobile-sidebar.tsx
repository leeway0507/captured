"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Instagram, Custom, NavArr, MyPageSignINOut, SearchBar } from "./mobile-sidebar-components";

const NavMobileSideBar = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) => {
    const [search, setSearch] = useState("");

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 " onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25 top-[100px] h-full" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto h-full">
                        <div className="flex h-full pt-[100px] ">
                            <Transition.Child
                                as={Fragment}
                                enter="transition  duration-500 ease-out transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition  duration-500 ease-out transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full">
                                <Dialog.Panel className="h-full w-80 max-w-[400px] transform overflow-hidden bg-white border border-deep-gray shadow-2xl transition-all">
                                    <div className="flex flex-col ">
                                        <div className="py-4 px-2">
                                            <SearchBar search={search} setSearch={setSearch} />
                                        </div>
                                        <div className="p-2">
                                            <NavArr />
                                        </div>
                                        <div className="bg-light-gray py-4 mt-4 mb-2">
                                            <MyPageSignINOut />
                                        </div>

                                        <div className="flex justify-between mx-4 py-2">
                                            <Instagram />
                                            <Custom />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default NavMobileSideBar;
