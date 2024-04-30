"use client";
import Image from "next/image";
import Link from "next/link";
import { cartProductCardProps } from "@/app/type";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { ConfirmPopUpModal } from "@/app/components/modal/new-yes-no-modal";
import { ProductCardModal } from "@/app/components/product-card/product-card-modal-form";

export default function CartProductCardForm({
    props,
    onDelete,
    countEnable,
    selectEnable,
}: {
    props: cartProductCardProps;
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
        increaseCartQuantity(sku, size, true, props as cartProductCardProps);
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
            <div className="flex-center max-w-[180px] grow">
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
                className="flex aspect-square h-[150px] tb:h-[180px] relative text-blue-black hover:opacity-50 active:opacity-100">
                <div className="relative aspect-square h-[100px] tb:h-[130px] m-auto">
                    <Image src={productImgUrl} fill sizes="200px" alt={productId} priority />
                </div>
            </Link>

            <div className="m-auto grow">
                <div className="flex flex-col ps-2 text-blue-black">
                    <div className="flex justify-between">
                        <Link href={`category/brand/${brand}`} className="text-sub-black link-animation">
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
                        <div className="text-sub-black">{size}</div>
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
                        className="accent-main-black scale-[115%] w-4"
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
