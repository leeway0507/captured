"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { ThumbnailProps } from "../type";

export default function ImageZoom({
    isModalOpen,
    setIsModalOpen,
    initImageID,
    thumbnailInfo,
}: {
    isModalOpen: boolean;
    setIsModalOpen: (v: boolean) => void;
    initImageID: string;
    thumbnailInfo: ThumbnailProps;
}) {
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const CloseButton = () => (
        <Image
            src={"/icons/white/x-mark-white.svg"}
            className="fixed top-5 right-5 tb:right-10 z-20 cursor-pointer"
            width={40}
            height={40}
            alt="close"
            priority
            onClick={closeModal}
        />
    );

    useEffect(() => {
        if (initImageID) {
            moveToImage(initImageID);
        }
    }, [initImageID]);

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
                        <div className="flex min-h-full items-center justify-center  text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter=""
                                enterFrom=""
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-80">
                                <Dialog.Panel className="relative h-[100vh] max-w-[1440px] rounded bg-white overflow-hidden my-auto py-2">
                                    {/* PC */}
                                    <div className="hidden lg:block w-full h-full">
                                        <div className="grid h-full aspect-[6/5] grid-cols-6 gap-2">
                                            <div className="col-span-1 z-50 hidden lg:block">
                                                <ImageNav thumbnailInfo={thumbnailInfo} />
                                            </div>
                                            <div className="col-span-5 overflow-hidden relative max-w-[1000px] ">
                                                <CloseButton />
                                                <ImageLayout thumbnailInfo={thumbnailInfo} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* mobile */}
                                    <div className="lg:hidden overflow-hidden relative h-full w-screen ">
                                        <CloseButton />
                                        <ImageLayout thumbnailInfo={thumbnailInfo} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        )
    );
}

function moveToImage(imageName: string) {
    const element = document.getElementById(`zoom-${imageName}`);
    element!.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ImageLayout({ thumbnailInfo }: { thumbnailInfo: ThumbnailProps }) {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];
    const handleImageError = (errorNode: any) => {
        const parentDiv = errorNode.target.parentNode;
        return (parentDiv.className = "hidden");
    };
    return (
        <div className="mx-auto w-full max-w-[1000px] h-full overflow-auto gap-2">
            {imageNameArray.map((imageName) => (
                <div
                    key={imageName}
                    id={`zoom-${imageName}`}
                    className="relative w-full aspect-square tb:mb-4 bg-gray-100">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${thumbnailInfo.sku}/${imageName}.${thumbnailInfo.imgType}`}
                        alt={`${thumbnailInfo.productName} ${thumbnailInfo.productId}`}
                        fill
                        sizes="1600px"
                        quality={100}
                        className="object-contain rounded-sm"
                        onError={handleImageError}
                    />
                </div>
            ))}
        </div>
    );
}
function ImageNav({ thumbnailInfo }: { thumbnailInfo: ThumbnailProps }) {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];
    const handleImageError = (errorNode: any) => {
        const parentDiv = errorNode.target.parentNode;
        return (parentDiv.className = "hidden");
    };

    return (
        <div className="ms-auto w-[100px] h-full flex flex-col">
            {imageNameArray.map((imageName) => (
                <button
                    key={imageName}
                    onClick={() => moveToImage(imageName)}
                    className="relative w-full aspect-square mb-2 border hover:border-blue-400 focus:border-blue-400 bg-gray-100">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${thumbnailInfo.sku}/${imageName}.${thumbnailInfo.imgType}`}
                        alt={`${thumbnailInfo.productName} ${thumbnailInfo.productId}`}
                        sizes="160px"
                        className="object-contain rounded-sm cursor-pointer "
                        fill
                        onError={handleImageError}
                    />
                </button>
            ))}
        </div>
    );
}
