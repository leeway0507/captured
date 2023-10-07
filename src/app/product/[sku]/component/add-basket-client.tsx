"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { productCardProps } from "@/app/type";
import { useState } from "react";
import ProductSizeTable from "./product-size-table";
import AddBascketModal from "./add-bascket-modal";

const AddBasket = (data: productCardProps) => {
    const { brand, productName, productId, imgType, sku, size, category } = data;
    const productImgUrl = `/product/${brand}/${productName} ${productId}/main.${imgType}`;

    const { sizeType, availableSize } = {
        sizeType: category,
        availableSize: JSON.parse(size).map((v: string | number) => typeof v === "number" && v.toString()),
    };
    const [selectedItem, setSelectedItem] = useState<string>(availableSize[0]);
    const { increaseCartQuantity } = useShoppingCart();
    const [openModal, setOpenModal] = useState(false);
    function AddBascketToggle() {
        setOpenModal(true);
        increaseCartQuantity(sku, selectedItem);
    }

    return (
        <>
            <div className="pt-4 ">
                <ProductSizeTable
                    sizeType={sizeType}
                    availableSize={availableSize}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                />
            </div>
            <div>
                <div className="black-bar-xl my-4" onClick={AddBascketToggle}>
                    장바구니 담기
                </div>
            </div>
            <AddBascketModal
                {...data}
                size={selectedItem}
                quantity={1}
                openModal={openModal}
                setOpenModal={setOpenModal}
                productImgUrl={productImgUrl}
            />
        </>
    );
};

export default AddBasket;
