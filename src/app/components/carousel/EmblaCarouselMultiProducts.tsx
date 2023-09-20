import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import "./carousel.css";

type PropType = {
    children: React.ReactNode;
};

const CarouselProgressBar: React.FC<PropType> = ({ children }) => {
    const options: EmblaOptionsType = { dragFree: true, containScroll: "trimSnaps" };
    const [emblaRef] = useEmblaCarousel(options);

    return (
        <div className="embla-multi">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">{children}</div>
            </div>
        </div>
    );
};

export default CarouselProgressBar;
