"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Instagram, Custom, NavArr, MyPageSignINOut, SearchBar } from "./mobile-sidebar-components";

const Content = () => {
    return (
        <>
            <div className="px-2">
                <NavArr />
            </div>
            <MyPageSignINOut />
            <div className="flex justify-between p-2">
                <Instagram />
                <Custom />
            </div>
        </>
    );
};

const NavMobileSideBar = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) => {
    const [search, setSearch] = useState("");

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
                                        <div className="py-4">
                                            <SearchBar search={search} setSearch={setSearch} />
                                            <Content />
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
