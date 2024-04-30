"use client";
import Image from "next/image";
import Link from "next/link";
import { productCardProps } from "@/app/type";

export default function ProductCard({
    props,
    isIntl = true,
}: {
    props: productCardProps;
    isIntl?: boolean;
    idx?: number;
    prorityNumber?: number;
}) {
    const { sku, brand, productName, price, productId, intl } = props;

    const productImgUrl = `${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${sku}/main.webp`;
    const shotenProductName = productName.length > 25 ? productName.slice(0, 25) + "..." : productName;
    return (
        <Link href={`/product/${sku}`} className=" text-sub-black text-xs font-light pb-6 z-1 max-w-[300px] " key={sku}>
            <div className="flex flex-col">
                <div className="relative w-full aspect-[1/1.2] mx-auto bg-gray-50 vignette rounded">
                    <Image
                        src={productImgUrl}
                        alt={String(sku)}
                        fill
                        sizes="800px"
                        className="object-cover"
                        quality={95}
                        priority
                    />
                </div>
                <div className="flex flex-col text-sub-black pt-1 px-1">
                    <div className="h-[50px] ">{`${brand} ${shotenProductName} | ${productId.toUpperCase()}`}</div>
                    <div className="py-2 font-bold">
                        {isIntl && <div className="inline-block">{intl ? "해외배송" : "국내배송"} | </div>} ₩{" "}
                        {price.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}
