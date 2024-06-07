"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";

import Autoplay from "embla-carousel-autoplay";
import styles from "./styles.module.css";

type EmblaCarouselProps = {
    children: ReactNode;
};

const EmblaCarousel = ({ children }: EmblaCarouselProps) => {
    const [emblaRef] = useEmblaCarousel();

    return (
        <div className="flex flex-col">
            <div className={styles.embla}>
                <div className={styles.embla__viewport} ref={emblaRef}>
                    <div className={styles.embla__container}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
