import CarouselProgressBar from "../../../components/carousel/EmblaCarouselProgressBar";
import Image from "next/image";

interface ThumbnailProps {
    brand: string;
    productName: string;
    productId: string;
}

export default function Thumbnail({ brand, productName, productId }: ThumbnailProps) {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];
    return (
        <CarouselProgressBar>
            {imageNameArray.map((imageName) => (
                <div key={imageName} className="embla__slide">
                    <Image
                        src={`/product/${brand}/${productName} ${productId}/${imageName}.png`}
                        alt={`${productName} ${productId}`}
                        width={800}
                        height={800}
                        className="embla__slide__img"
                    />
                </div>
            ))}
        </CarouselProgressBar>
    );
}
