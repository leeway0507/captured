import CartProductCardForm from "@/app/components/product-card/cart-product-card-form";
import { cartProductCardProps } from "../../../type";
import PopUpRemoveModal from "./cart-remove-modal";
import { useState } from "react";

export default function CartProductCardArr({ arr }: { arr: cartProductCardProps[] }) {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return arr?.map((item: cartProductCardProps, idx: number) => {
        const { brand, productName, productId, imgType } = item;
        const productImgUrl = `${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${brand}/${productName} ${productId}/main.${imgType}`;
        return (
            <div key={idx} className="relative mb-5">
                <div className="absolute top-5 right-0  text-sm underline">
                    <PopUpRemoveModal
                        {...item}
                        productImgUrl={productImgUrl}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                    />
                </div>
                <CartProductCardForm {...item} countEnable />
            </div>
        );
    });
}
