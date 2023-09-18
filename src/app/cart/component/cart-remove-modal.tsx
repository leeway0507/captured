"use client";

import { Button, Modal } from "flowbite-react";
import { useShoppingCart } from "../../shopping-cart-context";

import Image from "next/image";
import type { popUpRemoveModalProps } from "../type";

export default function PopUpRemoveModal({
    id,
    productImgUrl,
    brand,
    productName,
    productId,
    size,
    intl,
    openModal,
    setOpenModal,
}: popUpRemoveModalProps) {
    const props = { openModal, setOpenModal };
    const { setBgFreeze, removeFromCart } = useShoppingCart();

    const removeItemFromCart = (id: number) => {
        removeFromCart(id);
        setOpenModal(undefined);
        setBgFreeze(undefined);
    };

    function clickModal() {
        setOpenModal("pop-up");
        setBgFreeze("bg-freeze");
    }
    const resetValue = () => {
        setOpenModal(undefined);
        setBgFreeze(undefined);
    };
    return (
        <>
            <button type="button" className="px-2 click-effect" onClick={() => clickModal()}>
                <Image src="/icons/delete.svg" width={28} height={28} alt="delete" />
            </button>
            <Modal show={props.openModal === "pop-up"} size="sm" popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center z-50">
                        <h2 className="text-sub-black">아래와 일치하는 상품을 제거합니다.</h2>
                        <div className="flex flex-col py-3 pb-5">
                            <div className="flex text-sm-base">
                                <div className="flex-center flex-col basis-2/6">
                                    <Image src={productImgUrl} width={200} height={200} alt={productId} />
                                </div>
                                <div className="basis-4/6">
                                    <div className="flex flex-col ps-2 my-2 text-blue-black w-full ">
                                        <div className="uppercase text-sub-black me-auto">{brand}</div>
                                        <div className="text-blue-black me-auto">{productName}</div>
                                        <div className="uppercase me-auto">{productId}</div>
                                        <div className="flex justify-between ">
                                            <div>{size}</div>
                                            <div className="underline ">{intl ? "해외배송" : "국내배송"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={() => {
                                    removeItemFromCart(id);
                                }}>
                                예
                            </Button>
                            <Button color="gray" onClick={() => resetValue()}>
                                아니오
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
