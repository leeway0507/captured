import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";

type PropType = {
    children: React.ReactNode;
};

const CarouselProgressBar: React.FC<PropType> = ({ children }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">{children}</div>
            </div>
        </div>
    );
};

export default CarouselProgressBar;
