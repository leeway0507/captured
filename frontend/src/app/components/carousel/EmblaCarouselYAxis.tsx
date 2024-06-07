"use client";
import useEmblaCarousel from "embla-carousel-react";
import {EmblaOptionsType} from "embla-carousel"
import Image from "next/image";
import styles from "./styles.module.css";

const EmblaCarouselYAxis = () => {
    const options: EmblaOptionsType = { axis: "y" };
    const [emblaRef] = useEmblaCarousel(options);

    return (
        <div className={styles.embla_y_axis}>
            <div className={styles.embla__viewport_y_axis} ref={emblaRef}>
                <div className={styles.embla__container_y_axis}>
                    <ImageLayout />
                </div>
            </div>
        </div>
    );
};

function ImageLayout() {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];
    const handleImageError = (errorNode: any) => {
        const parentDiv = errorNode.target.parentNode;
        return (parentDiv.className = "hidden");
    };
    return (
        <>
            {imageNameArray.map((imageName) => (
                <div key={imageName} id={`zoom-${imageName}`} className="relative aspect-[4/5]">
                    <Image
                        src={`/test/${imageName}.webp`}
                        alt={imageName}
                        fill
                        sizes="1600px"
                        quality={100}
                        className="object-cover rounded-sm"
                        onError={handleImageError}
                    />
                </div>
            ))}
            {imageNameArray.map((imageName) => (
                <Image
                    key={imageName}
                    src={`/test/${imageName}.webp`}
                    alt={imageName}
                    width={1000}
                    height={1400}
                    sizes="1600px"
                    quality={100}
                    className="object-cover rounded-sm"
                    onError={handleImageError}
                />
            ))}
        </>
    );
}

export default EmblaCarouselYAxis;
