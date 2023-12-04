import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import styles from "./styles.module.css";

type PropType = {
    children: React.ReactNode;
};

const CarouselProgressBar: React.FC<PropType> = ({ children }) => {
    const options: EmblaOptionsType = { dragFree: true, containScroll: "trimSnaps" };
    const [emblaRef] = useEmblaCarousel(options);

    return (
        <div className={styles.embla_multi}>
            <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={styles.embla__container}>{children}</div>
            </div>
        </div>
    );
};

export default CarouselProgressBar;
