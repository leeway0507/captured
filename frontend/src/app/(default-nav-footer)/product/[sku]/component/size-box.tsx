"use client";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { productCardProps, cartProductCardProps } from "@/app/type";
import { useState } from "react";
import ProductSizeTable from "./product-size-table";
import { toast } from "react-toastify";

const SizeBox = ({ data, defaultSizeArr }: { data: productCardProps; defaultSizeArr: string[] }) => {
    const { sku, size, category } = data;

    const { sizeType, availableSize } = {
        sizeType: category,
        availableSize: size.split(","),
    };

    const [selectedItem, setSelectedItem] = useState<string>(availableSize[0] || "");
    const { increaseCartQuantity } = useShoppingCart();
    const btnClass = "black-bar-xl my-4 lg:text-xl w-full";
    const isSize = availableSize.length > 0;

    const handleModal = () => {
        increaseCartQuantity(sku, selectedItem, { ...data });
        toast.info("장바구니에 담았습니다.", {
            icon: false,
        });
    };

    return (
        <>
            <ProductSizeTable
                sizeType={sizeType}
                availableSize={availableSize}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                defaultSizeArr={defaultSizeArr}
            />
            <button className={`${btnClass}`} disabled={!isSize} onClick={handleModal}>
                {isSize ? "장바구니 담기" : "품절"}
            </button>
        </>
    );
};

export default SizeBox;
