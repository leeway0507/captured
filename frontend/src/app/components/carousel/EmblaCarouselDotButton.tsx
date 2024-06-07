"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from 'embla-carousel'
import { DotButton } from "./EmblaDot";
import Autoplay from "embla-carousel-autoplay";
import styles from "./styles.module.css";

type EmblaCarouselProps = {
    autoPlay: boolean;
    children: ReactNode;
};

const EmblaCarousel = ({ autoPlay, children }: EmblaCarouselProps) => {
    const autoplayOptions = {
        delay: 4000,
        playOnInit: autoPlay,
    };
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay(autoplayOptions)]);

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
            <div className={styles.embla}>
                <div className={styles.embla__viewport} ref={emblaRef}>
                    <div className={styles.embla__container}>{children}</div>
                </div>
            </div>
            <div className={styles.embla__dots}>
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`${styles.embla__dot} ${index === selectedIndex ? styles.embla__dot__selected : ""}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmblaCarousel;
