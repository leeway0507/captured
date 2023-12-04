"use client";
import Image from "next/image";
import Link from "next/link";
import { cartProductCardProps } from "@/app/type";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { ConfirmPopUpModal } from "../modal/new-yes-no-modal";
import { ProductCardModal } from "./product-card-modal-form";
import { memo } from "react";
interface cartProductCardFormProps extends cartProductCardProps {}

export default function CartProductCardForm({
    props,
    onDelete,
    countEnable,
    selectEnable,
}: {
    props: cartProductCardFormProps;
    onDelete: boolean;
    countEnable: boolean;
    selectEnable: boolean;
}) {
    const { sku, brand, productName, productId, size, price, quantity, intl, selected } = props;
    const { increaseCartQuantity, decreaseCartQuantity, getItemquantity, removeFromCart, toggleSelectedItem } =
        useShoppingCart();

    const deleteItemModal = ConfirmPopUpModal("아래와 일치하는 상품을 제거합니다.", ProductCardModal(props), () => {
        removeFromCart(sku, size);
    });

    const totalPrice = price * quantity;
    const productImgUrl = `${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${sku}/thumbnail.webp`;

    function askRemoveItemBeforeLastQuantity(sku: number, size: string) {
        if (getItemquantity(sku, size) === 1) {
            deleteItemModal();
        } else {
            decreaseCartQuantity(sku, size);
        }
    }
    const handleIncreaseCartQuantity = () => {
        // sku: number, size: string, selected: boolean
        increaseCartQuantity(sku, size, true, props);
    };

    const CountButton = () => (
        <>
            <button type="button" className="px-3 z-10" onClick={() => askRemoveItemBeforeLastQuantity(sku, size)}>
                <Image src="/icons/remove.svg" width={18} height={18} alt="remove" className="click-effect" priority />
            </button>
            <div>{quantity}</div>

            <button type="button" className="px-3" onClick={handleIncreaseCartQuantity}>
                <Image src="/icons/add.svg" width={18} height={18} alt="add" className="click-effect" priority />
            </button>
        </>
    );
    const CountPriceInfo = () => (
        <div className="flex w-full">
            <div className="flex-center max-w-[130px] grow">
                {countEnable ? <CountButton /> : <span> {`수량 : ${quantity}`}</span>}
            </div>
            <div className="text-sub-black flex-right grow text-base">₩ {totalPrice.toLocaleString()}</div>
        </div>
    );
    const selectHandler = () => {
        toggleSelectedItem(sku, size);
    };

    const ProductInfo = () => (
        <div className="flex mb-1 w-full">
            <Link
                href={`product/${sku}`}
                className="flex aspect-square h-[130px] relative text-blue-black hover:opacity-50 active:opacity-100">
                <Image src={productImgUrl} fill sizes="200px" alt={productId} priority />
            </Link>

            <div className="m-auto grow">
                <div className="flex flex-col ps-2 text-blue-black">
                    <div className="flex justify-between">
                        <Link href={`category/${brand}`} className="text-sub-black link-animation">
                            {brand.toUpperCase()}
                        </Link>
                        {onDelete && (
                            <button onClick={deleteItemModal}>
                                <Image src="/icons/delete.svg" width={24} height={24} alt="delete" priority />
                            </button>
                        )}
                    </div>

                    <div>{productName}</div>
                    <div className="text-xs">{productId.toUpperCase()}</div>
                    <div className="text-sm flex justify-between">
                        <div>{size}</div>
                        <div className="underline">{intl ? "해외배송" : "국내배송"}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex">
            {selectEnable && (
                <div className={`flex-center`}>
                    <input
                        className="accent-main-black w-3.5"
                        type="checkbox"
                        name="selected"
                        id={`${sku}-${size}-selected`}
                        checked={selected}
                        onChange={selectHandler}
                    />
                </div>
            )}
            <div className="flex-center flex-col text-sm pb-2 border-b border-deep-gray w-full" key={sku + size}>
                <ProductInfo />
                <CountPriceInfo />
            </div>
        </div>
    );
}
