"use client";

import { Button, Modal } from "flowbite-react";
import { ReactNode, useState } from "react";
import { useShoppingCart } from "../../shopping-cart-context";

interface popUpModalProps {
    toggleName: string | ReactNode;
    content: string;
    trueCallback: () => void;
}

export default function PopUpModal({ toggleName, content, trueCallback }: popUpModalProps) {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const { setBgFreeze } = useShoppingCart();

    function clickModal() {
        setOpenModal("pop-up");
        setBgFreeze("bg-freeze");
    }
    const resetValue = () => {
        setOpenModal(undefined);
        setBgFreeze(undefined);
    };
    function clickYes() {
        trueCallback();
        setOpenModal(undefined);
        setBgFreeze(undefined);
    }

    return (
        <>
            <button type="button" className="px-2" onClick={() => clickModal()}>
                {toggleName}
            </button>
            <Modal show={openModal === "pop-up"} size="md" popup onClose={() => setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <div className="mb-5">{content}</div>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => clickYes()}>
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
