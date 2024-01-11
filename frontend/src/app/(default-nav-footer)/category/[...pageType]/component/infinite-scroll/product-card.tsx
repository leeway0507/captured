"use client";
import Image from "next/image";
import Link from "next/link";
import { productCardProps } from "@/app/type";
import { useState } from "react";

const SoldOutLogo = () => (
    <div className="-rotate-[20deg] border border-4 border-rose-600 font-test text-xl tb:text-3xl text-rose-600 tracking-[0.05rem] py-1 px-2 rounded">
        CAPTURED
    </div>
);

const ProductCardSkeleton = () => (
    <div className="rounded-lg bg-light-gray aspect-square">
        <div className="w-full h-full flex-center text-3xl font-test text-rose-600/50">CAPTURED</div>
    </div>
);

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

    const productImgUrl = `${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${sku}/thumbnail.webp`;
    const shotenProductName = productName.length > 40 ? productName.slice(0, 40) + "..." : productName;
    return (
        <Link href={`/product/${sku}`} className=" text-sub-black text-xs font-light pb-6 z-1 " key={sku}>
            <div className="flex flex-col">
                <div className="relative">
                    {isLoaded ? (
                        <>
                            {props.size === "-" && (
                                <div className="flex-center bg-white/30 inset-0 absolute text-main-black">
                                    <SoldOutLogo />
                                </div>
                            )}

                            <Image
                                src={productImgUrl}
                                alt={String(sku)}
                                width={300}
                                height={300}
                                sizes="(min-width: 1520px) 329px, (min-width: 780px) 22.36vw, calc(50vw - 13px)"
                                className="rounded-lg "
                                onError={() => setIsLoaded(false)}
                                priority={idx < prorityNumber ? true : false}
                            />
                        </>
                    ) : (
                        <ProductCardSkeleton />
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
