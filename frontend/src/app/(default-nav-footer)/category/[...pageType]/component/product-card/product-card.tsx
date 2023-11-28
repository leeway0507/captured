"use client";
import Image from "next/image";
import Link from "next/link";
import { productCardProps } from "@/app/type";
import { useState } from "react";

export default function ProductCard({
    props,
    isIntl = true,
    idx = 3,
    prorityNumber = 3,
}: {
    props: productCardProps;
    isIntl?: boolean;
    idx?: number;
    prorityNumber?: number;
}) {
    const { sku, brand, productName, price, productId, intl } = props;

    const [isLoaded, setIsLoaded] = useState(true);

    const productImgUrl = `${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${brand}/${productName} ${productId}/thumbnail.png`;
    const shotenProductName = productName.length > 25 ? productName.slice(0, 25) + "..." : productName;
    return (
        <Link href={`/product/${sku}`} className=" text-sub-black text-xs font-light pb-6 z-1 " key={sku}>
            <div className="flex flex-col">
                <div className="relative">
                    {/* <div className="h-[200px] aspect-square flex-center text-2xl">{sku}</div> */}
                    {isLoaded ? (
                        <Image
                            src={productImgUrl}
                            alt={String(sku)}
                            width={300}
                            height={300}
                            sizes="(min-width: 1520px) 329px, (min-width: 780px) 22.36vw, calc(50vw - 13px)"
                            className="rounded-lg"
                            onError={() => setIsLoaded(false)}
                            priority={idx < prorityNumber ? true : false}
                        />
                    ) : (
                        <Image
                            src={"/icons/skeleton.png"}
                            alt="default"
                            width={300}
                            height={300}
                            sizes="(min-width: 1520px) 329px, (min-width: 780px) 22.36vw, calc(50vw - 13px)"
                            className="rounded-lg"
                        />
                    )}
                </div>
                <div className="flex flex-col text-sub-black">
                    <div className="h-[50px]">{`${brand} ${shotenProductName} | ${productId.toUpperCase()}`}</div>
                    <div className="py-2 font-bold">
                        {isIntl && <div className="inline-block font-bold">{intl ? "해외배송" : "국내배송"} | </div>} ₩{" "}
                        {price.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}
