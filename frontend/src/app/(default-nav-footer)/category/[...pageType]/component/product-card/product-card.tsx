"use client";
import Image from "next/image";
import Link from "next/link";
import { productCardProps } from "@/app/type";
import { useState } from "react";

export default function ProductCard(props: productCardProps) {
    const { sku, brand, productName, price, productId, intl } = props;

    const [isLoaded, setIsLoaded] = useState(true);

    const productImgUrl = `${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${brand}/${productName} ${productId}/thumbnail.png`;
    return (
        <Link href={`/product/${sku}`} className=" text-sub-black text-xs font-light pb-6 z-1 " key={sku}>
            <div className="flex flex-col">
                <div className="max-w-[300px] max-h-[300px] relative">
                    {isLoaded ? (
                        <Image
                            src={productImgUrl}
                            alt={String(sku)}
                            width="300"
                            height="300"
                            className="rounded-lg"
                            onError={() => setIsLoaded(false)}
                        />
                    ) : (
                        <Image
                            src={"/icons/skeleton.png"}
                            alt="default"
                            width="300"
                            height="300"
                            className="rounded-lg"
                        />
                    )}
                </div>
                <div className="flex flex-col text-sub-black">
                    <div className="flex justify-between">
                        {/* <div className="uppercase text-sub-black">{brand}</div> */}
                    </div>
                    <div className="h-[40px]">{`${brand} ${productName} | ${productId.toUpperCase()}`}</div>
                    <div className="py-2 font-bold">
                        <div className="inline-block font-bold">{intl ? "해외배송" : "국내배송"}</div> | ₩{" "}
                        {price.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}
