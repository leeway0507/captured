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
        <div className="h-full overflow-auto pt-4 pe-5">
            {imageNameArray.map((imageName) => (
                <div key={imageName}>
                    <Image
                        src={`/product/${brand}/${productName} ${productId}/${imageName}.png`}
                        alt={`${productName} ${productId}`}
                        width={1600}
                        height={1600}
                        className="rounded-md mb-2"
                    />
                </div>
            ))}
        </div>
    );
}
