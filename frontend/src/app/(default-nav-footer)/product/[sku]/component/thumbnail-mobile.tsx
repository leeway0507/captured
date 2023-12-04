"use client";
import CarouselProgressBar from "../../../../components/carousel/EmblaCarouselProgressBar";
import Image from "next/image";
import { ThumbnailProps } from "../type";
import style from "@/app/components/carousel/styles.module.css";

export default function Thumbnail({ sku, productName, productId, imgType }: ThumbnailProps) {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];

    const handleImageError = (error: any) => {
        const parentDiv = error.target.parentNode;
        return (parentDiv.className = "hidden");
    };

    return (
        <CarouselProgressBar>
            {imageNameArray.map((imageName) => (
                <div key={imageName} className={style.embla__slide}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${sku}/${imageName}.${imgType}`}
                        alt={`${productName} ${productId}`}
                        width={400}
                        height={400}
                        sizes="50vw"
                        className={style.embla__slide__img}
                        priority={imageName === "main" ? true : false}
                        onError={handleImageError}
                    />
                </div>
            ))}
        </CarouselProgressBar>
    );
}
