"use client";
import Image from "next/image";
import { ThumbnailProps } from "../type";

export default function Thumbnail({ sku, productName, productId, imgType }: ThumbnailProps) {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];
    const handleImageError = (error: any) => {
        const parentDiv = error.target.parentNode;
        return (parentDiv.className = "hidden");
    };
    return (
        <div className="h-full overflow-auto pt-6 w-full">
            {imageNameArray.map((imageName) => (
                <div key={imageName} className="relative max-w-[800px] w-full aspect-square">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${sku}/${imageName}.${imgType}`}
                        alt={`${productName} ${productId}`}
                        fill
                        sizes="(min-width: 1220px) 734px, calc(93.33vw - 386px)"
                        className="rounded-sm object-cover"
                        quality={95}
                        onError={handleImageError}
                    />
                </div>
            ))}
        </div>
    );
}
