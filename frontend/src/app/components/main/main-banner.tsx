import Carousel from "../carousel/EmblaCarouselDotButton";
import Thumbnail from "./thumbnail-form";

interface ThumbnailInfo {
    src: string;
    brand: string;
    productName: string;
    href: string;
}

interface thumbnailInfos {
    thumbnailInfos: ThumbnailInfo[];
}

export default function Banner({ thumbnailInfos }: thumbnailInfos) {
    return (
        <Carousel autoPlay={true}>
            {thumbnailInfos.map((thumbnailInfo: ThumbnailInfo, index: number) => {
                const { src, brand, productName, href } = thumbnailInfo;
                return (
                    <div className="embla__slide" key={index}>
                        <Thumbnail src={src} brand={brand} productName={productName} href={href} />
                    </div>
                );
            })}
        </Carousel>
    );
}
