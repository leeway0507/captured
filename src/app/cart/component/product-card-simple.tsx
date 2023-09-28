import { useState } from "react";
import Image from "next/image";
import PopUpRemoveModal from "./cart-remove-modal";
import PopUpRemoveModalWithoutBtn from "./cart-remove-modal-without-btn";
import { useShoppingCart } from "../../shopping-cart-context";
import { cartProductCardProps } from "../../type";
import Link from "next/link";

export function ProductCardSimple(props: cartProductCardProps) {
    const { id, brand, productName, productId, size, quantity, price, intl } = props;
    const { increaseCartQuantity, decreaseCartQuantity, getItemquantity } = useShoppingCart();
    const [openModal, setOpenModal] = useState<boolean>(false);

    function askRemoveItemBeforeLastQuantity(id: number) {
        if (getItemquantity(id) === 1) {
            setOpenModal(true);
        } else {
            decreaseCartQuantity(id);
        }
    }

    const totalPrice = price * quantity;
    const productImgUrl = `/product/${brand}/${productName} ${productId}/main.png`;

    return (
        <div className="mondaL text-sub-black py-5 px-3 tb:px-5 text-base border-b border-deep-gray">
            <div className="flex-center flex-col pt-2">
                <div className="flex mb-1 w-full">
                    <div className="flex-center flex-col max-w-[120px]">
                        <Image src={productImgUrl} width={200} height={200} alt={productId} />
                    </div>
                    <div className="grow">
                        <div className="flex flex-col ps-2 text-blue-black">
                            <div className="flex justify-between">
                                <Link
                                    href={`cat/${brand.replace(" ", "-")}`}
                                    className="text-sub-black text-base hover:text-blue-400">
                                    {brand.toUpperCase()}
                                </Link>
                                <PopUpRemoveModal
                                    {...props}
                                    productImgUrl={productImgUrl}
                                    openModal={openModal}
                                    setOpenModal={setOpenModal}
                                />
                            </div>
                            <Link
                                href={`product/${brand}/${productName} ${productId}`}
                                className="text-blue-black hover:text-blue-300">
                                {productName}
                                <div>{productId.toUpperCase()}</div>
                            </Link>
                            <div className="flex justify-between">
                                <div>{size}</div>
                                <div className="underline text-sm">{intl ? "해외배송" : "국내배송"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="flex-center max-w-[120px] grow">
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
                    <div className="text-sub-black flex-right grow text-lg">₩ {totalPrice.toLocaleString()}</div>
                </div>
            </div>
            <PopUpRemoveModalWithoutBtn
                {...props}
                productImgUrl={productImgUrl}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </div>
    );
}
