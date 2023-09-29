import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartProductCardProps } from "@/app/type";
import { useShoppingCart } from "@/app/shopping-cart-context";
import PopUpRemoveModalWithoutBtn from "./cart-remove-modal-without-btn";

interface cartProductCardFormProps extends cartProductCardProps {
    countEnable: boolean;
}

export default function CartProductCardForm(props: cartProductCardFormProps) {
    const { id, brand, productName, productId, size, price, quantity, intl, countEnable } = props;
    const { increaseCartQuantity, decreaseCartQuantity, getItemquantity } = useShoppingCart();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const totalPrice = price * quantity;
    const productImgUrl = `/product/${brand}/${productName} ${productId}/main.png`;

    function askRemoveItemBeforeLastQuantity(id: number, size: string) {
        if (getItemquantity(id, size) === 1) {
            setOpenModal(true);
        } else {
            decreaseCartQuantity(id, size);
        }
    }

    return (
        <div className="text-sub-black py-8 px-3 text-base border-b border-deep-gray" key={id}>
            <div className="flex-center flex-col pt-2">
                <div className="flex mb-1 w-full">
                    <div className="flex-center flex-col max-w-[120px]">
                        <Image src={productImgUrl} width={200} height={200} alt={productId} />
                    </div>
                    <div className="grow">
                        <div className="flex flex-col ps-2 text-blue-black">
                            <div>
                                <Link href={`category/${brand}`} className="text-sub-black text-base link-animation">
                                    {brand.toUpperCase()}
                                </Link>
                            </div>
                            <div>
                                <Link href={`product/${id}`} className="text-blue-black link-animation">
                                    {productName}
                                </Link>
                            </div>
                            <div className="text-sm">{productId.toUpperCase()}</div>
                            <div className="flex justify-between">
                                <div>{size}</div>
                                <div className="underline text-sm">{intl ? "해외배송" : "국내배송"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    {countEnable ? (
                        <>
                            <div className="flex-center max-w-[120px] grow">
                                <button
                                    type="button"
                                    className="px-3"
                                    onClick={() => askRemoveItemBeforeLastQuantity(id, size)}>
                                    <Image
                                        src="/icons/remove.svg"
                                        width={18}
                                        height={18}
                                        alt="remove"
                                        className="click-effect"
                                    />
                                </button>
                                <div>{quantity}</div>
                                <button type="button" className="px-3" onClick={() => increaseCartQuantity(id, size)}>
                                    <Image
                                        src="/icons/add.svg"
                                        width={18}
                                        height={18}
                                        alt="add"
                                        className="click-effect"
                                    />
                                </button>
                            </div>
                            <div className="text-sub-black flex-right grow text-lg">
                                ₩ {totalPrice.toLocaleString()}
                            </div>
                            <PopUpRemoveModalWithoutBtn
                                {...props}
                                productImgUrl={productImgUrl}
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                            />
                        </>
                    ) : (
                        <>
                            <div className="text-sm flex-center max-w-[120px] grow">
                                <span> {`수량 : ${quantity}`}</span>
                            </div>
                            <div className="text-sub-black flex-right grow text-lg">
                                ₩ {totalPrice.toLocaleString()}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
