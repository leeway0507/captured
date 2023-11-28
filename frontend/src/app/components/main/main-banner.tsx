import Image from "next/image";
import Carousel from "../carousel/EmblaCarouselDotButton";
import Link from "next/link";
interface ThumbnailInfo {
    src: string;
    linkName: string;
    href: string;
}

interface thumbnailInfos {
    thumbnailInfos: ThumbnailInfo[];
}

const ThumbNailCard = ({ src, linkName, href }: ThumbnailInfo) => {
    return (
        <>
            <div className="w-full aspect-square tb:aspect-[2/1]">
                <Image
                    src={src}
                    alt={linkName}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    className="z-10 mx-auto border-y border-gray-400 "
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 w-full flex-center z-20 flex-cetner w-[90%] py-6">
                <Link href={href} className="flex-center">
                    <div className="w-72 tb:w-96 text-center tb:text-xl border rounded-lg shadow-lg py-3 backdrop-blur-lg backdrop-brightness-90 text-gray-200 font-bold">
                        SHOP NOW
                    </div>
                </Link>
            </div>
        </>
    );
};
export default function Banner({ thumbnailInfos }: thumbnailInfos) {
    return (
        <Carousel autoPlay={false}>
            {thumbnailInfos.map((thumbnailInfo: ThumbnailInfo, index: number) => {
                const { src, linkName, href } = thumbnailInfo;
                return (
                    <div className="embla__slide" key={index}>
                        <ThumbNailCard src={src} linkName={linkName} href={href} />
                    </div>
                );
            })}
        </Carousel>
    );
}
