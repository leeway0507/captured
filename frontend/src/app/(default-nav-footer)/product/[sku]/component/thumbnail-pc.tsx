"use client";
import Image from "next/image";
import { ThumbnailProps } from "../type";
import ImageZoom from "./thumbnail-zoom";
import { useState } from "react";

export default function Thumbnail({ sku, productName, productId, imgType }: ThumbnailProps) {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];
    const handleImageError = (errorNode: any) => {
        const parentDiv = errorNode.target.parentNode;
        return (parentDiv.className = "hidden");
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickImgID, setClickImgId] = useState("");

    const onClickHandler = (imageName: string) => {
        setIsModalOpen(true);
        setClickImgId(imageName);
    };

    const thumbnil = {
        sku,
        productName,
        productId,
        imgType,
    };

    return (
        <>
            <div className="grid lg:grid-cols-2 overflow-auto pt-6 w-full gap-1">
                {imageNameArray.map((imageName) => (
                    <div key={imageName} className="relative w-full aspect-square bg-gray-50 ">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${sku}/${imageName}.${imgType}`}
                            alt={`${productName} ${productId}`}
                            fill
                            sizes="1000px"
                            className="rounded-sm object-contain cursor-zoom-in "
                            quality={95}
                            onError={handleImageError}
                            onClick={() => onClickHandler(imageName)}
                        />
                    </div>
                ))}
            </div>
            <ImageZoom
                thumbnailInfo={thumbnil}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                initImageID={clickImgID}
            />
        </>
    );
}
