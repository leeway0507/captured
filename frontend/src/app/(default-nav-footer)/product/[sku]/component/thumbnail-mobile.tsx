"use client";
import CarouselProgressBar from "../../../../components/carousel/EmblaCarouselProgressBar";
import Image from "next/image";
import { ThumbnailProps } from "../type";

export default function Thumbnail({ brand, productName, productId, imgType }: ThumbnailProps) {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];
    return (
        <CarouselProgressBar>
            {imageNameArray.map((imageName) => (
                <div key={imageName} className="embla__slide">
                    <Image
                        src={`/product/${brand}/${productName} ${productId}/${imageName}.${imgType}`}
                        alt={`${productName} ${productId}`}
                        width={400}
                        height={400}
                        className="embla__slide__img"
                    />
                </div>
            ))}
        </CarouselProgressBar>
    );
}
