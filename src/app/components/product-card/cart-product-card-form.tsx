import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartProductCardProps } from "@/app/type";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import PopUpRemoveModalWithoutBtn from "./cart-remove-modal-without-btn";

interface cartProductCardFormProps extends cartProductCardProps {
    countEnable: boolean;
}

export default function CartProductCardForm(props: cartProductCardFormProps) {
    const { sku, brand, productName, productId, size, price, quantity, intl, imgType, countEnable } = props;
    const { increaseCartQuantity, decreaseCartQuantity, getItemquantity } = useShoppingCart();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const totalPrice = price * quantity;
    const productImgUrl = `/product/${brand}/${productName} ${productId}/thumbnail.png`;

    function askRemoveItemBeforeLastQuantity(sku: number, size: string) {
        if (getItemquantity(sku, size) === 1) {
            setOpenModal(true);
        } else {
            decreaseCartQuantity(sku, size);
        }
    }

    return (
        <div className="text-sub-black text-sm pb-2 border-b border-deep-gray" key={sku}>
            <div className="flex-center flex-col">
                <div className="flex mb-1 w-full">
                    <div className="flex-center flex-col max-w-[120px] tb:max-w-[150px]">
                        <Link href={`product/${sku}`} className="text-blue-black hover:opacity-50 active:opacity-100">
                            <Image src={productImgUrl} width={500} height={500} alt={productId} />
                        </Link>
                    </div>
                    <div className="m-auto grow">
                        <div className="flex flex-col ps-2 text-blue-black">
                            <div>
                                <Link href={`category/${brand}`} className="text-sub-black link-animation">
                                    {brand.toUpperCase()}
                                </Link>
                            </div>
                            <div>
                                <Link href={`product/${sku}`} className="text-blue-black link-animation">
                                    {productName}
                                </Link>
                            </div>
                            <div className="text-xs">{productId.toUpperCase()}</div>
                            <div className="pt-2 text-xs flex justify-between">
                                <div>{size}</div>
                                <div className="underline">{intl ? "해외배송" : "국내배송"}</div>
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
                                    onClick={() => askRemoveItemBeforeLastQuantity(sku, size)}>
                                    <Image
                                        src="/icons/remove.svg"
                                        width={18}
                                        height={18}
                                        alt="remove"
                                        className="click-effect"
                                    />
                                </button>
                                <div>{quantity}</div>
                                <button type="button" className="px-3" onClick={() => increaseCartQuantity(sku, size)}>
                                    <Image
                                        src="/icons/add.svg"
                                        width={18}
                                        height={18}
                                        alt="add"
                                        className="click-effect"
                                    />
                                </button>
                            </div>
                            <div className="text-sub-black flex-right grow text-base">
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
                            <div className="flex-center max-w-[120px] grow">
                                <span> {`수량 : ${quantity}`}</span>
                            </div>
                            <div className="text-sub-black flex-right grow text-base">
                                ₩ {totalPrice.toLocaleString()}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
