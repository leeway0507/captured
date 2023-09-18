import { useState } from "react";
import Image from "next/image";
import PopUpRemoveModal from "./cart-remove-modal";
import { useShoppingCart } from "../../shopping-cart-context";
import type { cartProductCardSimpleProps } from "../type";

export function ProductCardSimple({
    id,
    productImgUrl,
    brand,
    productName,
    productId,
    size,
    quantity,
    price,
    intl,
}: cartProductCardSimpleProps) {
    const { setBgFreeze, increaseCartQuantity, decreaseCartQuantity, getItemquantity } = useShoppingCart();
    const [openModal, setOpenModal] = useState<string | undefined>(undefined);

    const totalPrice = price * quantity;

    function askRemoveItemBeforeLastQuantity(id: number) {
        if (getItemquantity(id) === 1) {
            setOpenModal("pop-up");
            setBgFreeze("bg-freeze");
        } else {
            decreaseCartQuantity(id);
        }
    }

    return (
        <div className="mondaL text-sub-black py-5 px-3 tb:px-5 text-base-lg border-b border-deep-gray">
            <div className="flex-center flex-col pt-2">
                <div className="flex mb-1 w-full">
                    <div className="flex-center flex-col max-w-[150px]">
                        <Image src={productImgUrl} width={200} height={200} alt={productId} />
                    </div>
                    <div className="grow">
                        <div className="flex flex-col ps-2 text-blue-black">
                            <div className="flex justify-between">
                                <div className="text-sub-black text-base-lg">{brand.toUpperCase()}</div>
                                <PopUpRemoveModal
                                    id={id}
                                    productImgUrl={productImgUrl}
                                    brand={brand}
                                    productName={productName}
                                    productId={productId}
                                    size={size}
                                    intl={intl}
                                    openModal={openModal}
                                    setOpenModal={setOpenModal}
                                />
                            </div>
                            <div className="text-blue-black">{productName}</div>
                            <div>{productId.toUpperCase()}</div>
                            <div className="flex justify-between">
                                <div>{size}</div>
                                <div className="underline  ">{intl ? "해외배송" : "국내배송"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="flex-center max-w-[150px] grow">
                        <button type="button" className="px-3" onClick={() => askRemoveItemBeforeLastQuantity(id)}>
                            <Image
                                src="/icons/remove.svg"
                                width={18}
                                height={18}
                                alt="remove"
                                className="click-effect"
                            />
                        </button>
                        <div>{quantity}</div>
                        <button type="button" className="px-3" onClick={() => increaseCartQuantity(id)}>
                            <Image src="/icons/add.svg" width={18} height={18} alt="add" className="click-effect" />
                        </button>
                    </div>
                    <div className="flex-right grow text-lg-xl">₩ {totalPrice.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}
