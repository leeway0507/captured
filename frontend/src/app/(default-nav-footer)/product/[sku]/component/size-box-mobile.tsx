"use client";
import { productCardProps } from "@/app/type";
import { useState, useEffect, useRef } from "react";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { toast } from "react-toastify";
import ProductSizeTable from "./product-size-table";
import useSizeDetect from "@/app/components/hook/use-size-detect-hook";

const SizeBoxMobile = ({ data, defaultSizeArr }: { data: productCardProps; defaultSizeArr: string[] }) => {
    const { maxHeight, innerHeight } = useSizeDetect();
    const { sku, size, category } = data;
    const { sizeType, availableSize } = {
        sizeType: category,
        availableSize: size.split(","),
    };

    const [selectedItem, setSelectedItem] = useState<string>(availableSize[0] || "");
    const { increaseCartQuantity } = useShoppingCart();
    const isSize = availableSize[0] !== "-";

    const handleModal = () => {
        // sku: number, size: string, selected: boolean
        increaseCartQuantity(sku, selectedItem, true, { ...data });
        toast.info("장바구니에 담았습니다.", {
            icon: false,
            style: {
                margin: "0 auto",
                width: "80%",
            },
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
            <div
                className={`${
                    maxHeight > 0 && maxHeight == innerHeight ? "h-[110px] pb-[30px]" : "h-[80px]"
                }  bg-white fixed left-0 px-4 bottom-0 flex gap-4 w-full  border-t-2 items-center justify-between z-10`}>
                <div className="flex flex-col basis-1/5">
                    <div className=" text-left">결제금액</div>
                    <div>{"₩" + data.price.toLocaleString()}</div>
                </div>
                <button
                    className="basis-1/2 rounded-lg bg-main-black text-white text-lg tracking-wider px-4 py-3 w-full"
                    disabled={!isSize}
                    onClick={handleModal}>
                    {isSize ? "장바구니 담기" : "품절"}
                </button>
            </div>
        </>
    );
};

export default SizeBoxMobile;