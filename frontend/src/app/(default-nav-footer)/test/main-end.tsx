"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";
import EmblaCarouselYAxis from "@/app/components/carousel/EmblaCarouselYAxis";

export default function Main() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    return <PopUpModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />;
}
function PopUpModal({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean; setIsModalOpen: (v: boolean) => void }) {
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const CloseButton = () => (
        <Image
            src={"/icons/white/x-mark-white.svg"}
            className="fixed top-5 right-2 z-20 cursor-pointer"
            width={40}
            height={40}
            alt="close"
            priority
            onClick={closeModal}
        />
    );

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
                        <div className="fixed inset-0 bg-white" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-1 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter=""
                                enterFrom=""
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-80">
                                <Dialog.Panel className="w-full h-full relative bg-white py-1 overflow-hidden">
                                    {/* <CloseButton /> */}
                                    <EmblaCarouselYAxis />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        )
    );
}

function ImagLayout() {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];
    const handleImageError = (errorNode: any) => {
        const parentDiv = errorNode.target.parentNode;
        return (parentDiv.className = "hidden");
    };
    return (
        <div className="mx-auto w-full h-full overflow-auto gap-2">
            {imageNameArray.map((imageName) => (
                <div key={imageName} id={`zoom-${imageName}`} className="relative w-full aspect-[4/5]">
                    <Image
                        src={`/test/${imageName}.webp`}
                        alt={imageName}
                        fill
                        sizes="1600px"
                        quality={100}
                        className="object-cover rounded-sm"
                        onError={handleImageError}
                    />
                </div>
            ))}
        </div>
    );
}
