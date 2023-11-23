"use client";
import { productCardProps } from "@/app/type";
import { useState, useEffect, useRef } from "react";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { toast } from "react-toastify";
import ProductSizeTable from "./product-size-table";

const SizeBoxMobile = ({ data, defaultSizeArr }: { data: productCardProps; defaultSizeArr: string[] }) => {
    const { sku, size, category } = data;
    const { sizeType, availableSize } = {
        sizeType: category,
        availableSize: size.split(","),
    };

    const [selectedItem, setSelectedItem] = useState<string>(availableSize[0] || "");
    const { increaseCartQuantity } = useShoppingCart();
    const isSize = availableSize.length > 0;

    const handleModal = () => {
        increaseCartQuantity(sku, selectedItem, { ...data });
        toast.info("장바구니에 담았습니다.", {
            icon: false,
            style: {
                margin: "0 auto",
                width: "80%",
            },
        });
    };

    const [innerHeight, setInnerHeight] = useState<number>(0);
    const [defaultHeight, setDefaultHeight] = useState<number>(0);

    const timerRef = useRef<any>(null);

    useEffect(() => {
        const handleResize = () => {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setInnerHeight(window.innerHeight);
            }, 300);
        };

        setDefaultHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                ref={timerRef}
                className={`${
                    defaultHeight < innerHeight ? "h-[110px] pb-[30px]" : "h-[80px]"
                } bg-white fixed bottom-0 flex px-4 gap-4 w-full  border-t-2 items-center justify-between z-10`}>
                <div className="basis-2/5 text-left text-lg font-bold">₩ {data.price.toLocaleString()}</div>
                <button
                    className="basis-3/5 rounded-lg bg-main-black text-white text-lg tracking-wider px-2 py-3 w-full"
                    disabled={!isSize}
                    onClick={handleModal}>
                    {isSize ? "장바구니 담기" : "품절"}
                </button>
            </div>
        </>
    );
};

export default SizeBoxMobile;
