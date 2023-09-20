import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import "./carousel.css";

type PropType = {
    children: React.ReactNode;
};

const CarouselProgressBar: React.FC<PropType> = ({ children }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
    const [scrollProgress, setScrollProgress] = useState(0);

    const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onScroll(emblaApi);
        emblaApi.on("reInit", onScroll);
        emblaApi.on("scroll", onScroll);
    }, [emblaApi, onScroll]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">{children}</div>
            </div>
            <div className="embla__progress">
                <div
                    className="embla__progress__bar"
                    style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
                />
            </div>
        </div>
    );
};

export default CarouselProgressBar;
