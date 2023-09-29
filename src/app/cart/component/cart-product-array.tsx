import CartProductCardForm from "@/app/components/product-card/cart-product-card-form";
import { cartProductCardProps } from "../../type";
import PopUpRemoveModal from "./cart-remove-modal";
import { useState } from "react";

export default function CartProductCardArr({ arr }: { arr: cartProductCardProps[] }) {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return arr.map((item: cartProductCardProps, idx: number) => {
        const productImgUrl = `/product/${item.brand}/${item.productName} ${item.productId}/main.png`;
        return (
            <div key={idx} className="relative">
                <div className="absolute top-0 right-0 mt-10 me-3  text-sm underline">
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
