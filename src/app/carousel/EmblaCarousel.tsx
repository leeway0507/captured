"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from "embla-carousel-react";
import { DotButton } from "./EmblaDot";
import { Thumbnail } from "./thumbnail";
import Autoplay from "embla-carousel-autoplay";

type ThumbnailInfo = {
    src: string;
    brand: string;
    productName: string;
    href: string;
};

type PropType = {
    thumbnailInfos: ThumbnailInfo[];
};

const EmblaCarousel: React.FC<PropType> = ({ thumbnailInfos }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi.on("reInit", onInit);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    return (
        <div className="flex flex-col">
            <div className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {thumbnailInfos.map((thumbnailInfo: ThumbnailInfo, index: number) => {
                            const { src, brand, productName, href } = thumbnailInfo;
                            return (
                                <div className="embla__slide" key={index}>
                                    <Thumbnail src={src} brand={brand} productName={productName} href={href} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={"embla__dot".concat(index === selectedIndex ? " embla__dot--selected" : "")}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmblaCarousel;
