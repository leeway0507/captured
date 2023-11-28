import useEmblaCarousel from "embla-carousel-react";
import styles from "./styles.module.css";

type PropType = {
    children: React.ReactNode;
};

const CarouselProgressBar: React.FC<PropType> = ({ children }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

    return (
        <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={styles.embla__container}>{children}</div>
            </div>
        </div>
    );
};

export default CarouselProgressBar;
