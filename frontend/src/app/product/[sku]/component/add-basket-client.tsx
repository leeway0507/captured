"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { productCardProps } from "@/app/type";
import { useState } from "react";
import ProductSizeTable from "./product-size-table";
import AddBascketModal from "./add-bascket-modal";

const AddBasket = ({ data, defaultSizeArr }: { data: productCardProps; defaultSizeArr: string[] }) => {
    const { brand, productName, productId, imgType, sku, size, category } = data;

    const productImgUrl = `/product/${brand}/${productName} ${productId}/main.${imgType}`;

    const { sizeType, availableSize } = {
        sizeType: category,
        availableSize: size.split(","),
    };

    const [selectedItem, setSelectedItem] = useState<string>(availableSize[0] || "");
    const { increaseCartQuantity } = useShoppingCart();
    const [openModal, setOpenModal] = useState(false);
    function AddBascketToggle() {
        setOpenModal(true);
        increaseCartQuantity(sku, selectedItem, { ...data });
    }

    return (
        <>
            <div className="pt-4 ">
                <ProductSizeTable
                    sizeType={sizeType}
                    availableSize={availableSize}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    defaultSizeArr={defaultSizeArr}
                />
            </div>
            <div>
                {availableSize.length === 0 ? (
                    <button className="black-bar-xl my-4 lg:text-xl w-full" disabled>
                        품절
                    </button>
                ) : (
                    <button className="black-bar-xl my-4 lg:text-xl w-full font-bold" onClick={AddBascketToggle}>
                        장바구니 담기
                    </button>
                )}
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
