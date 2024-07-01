"use client";
import CarouselProgressBar from "@/app/components/carousel/EmblaCarouselMultiProducts";
import Image from "next/image";
import style from "@/app/components/carousel/styles.module.css";
import ImageZoom from "./thumbnail-zoom";
import { ThumbnailProps } from "../type";
import { useState } from "react";

export default function Thumbnail({ sku, productName, productId, imgType }: ThumbnailProps) {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];

    const handleImageError = (error: any) => {
        const parentDiv = error.target.parentNode;
        return (parentDiv.className = "none");
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
            <CarouselProgressBar>
                {imageNameArray.map((imageName) => (
                    <div key={imageName} className={style.embla__slide}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${sku}/${imageName}.${imgType}`}
                            alt={`${productName} ${productId}`}
                            width={400}
                            height={400}
                            sizes="1000px"
                            quality={95}
                            className={`${style.embla__slide__img} bg-gray-100`}
                            priority
                            onError={handleImageError}
                            onClick={() => onClickHandler(imageName)}
                        />
                    </div>
                ))}
            </CarouselProgressBar>
            <ImageZoom
                thumbnailInfo={thumbnil}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                initImageID={clickImgID}
            />
        </>
    );
}
