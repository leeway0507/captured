import Image from "next/image";
import Link from "next/link";
import styles from "@/app/components/carousel/styles.module.css";
import Carousel from "../carousel/EmblaCarouselDotButton";

export type thumbnailInfo = {
    fileName: string;
    href: string;
};

export default function Thumbnail({
    thumbnailInfos,
    isMobile,
}: {
    thumbnailInfos: thumbnailInfo[] | undefined;
    isMobile: boolean | undefined;
}) {
    return (
        <div className="w-full aspect-[1/1.2] tb:aspect-[2.3/1]">
            <Carousel autoPlay={false}>
                {thumbnailInfos == undefined ? (
                    <DefaultSlider />
                ) : (
                    <CardSlider thumbnailInfos={thumbnailInfos} device={isMobile ? "mobile" : "pc"} />
                )}
            </Carousel>
        </div>
    );
}

const DefaultSlider = () => {
    // card를 두 개 이상으로 설정해야 문제없이 작동함. 이대로 둘 것
    return (
        <>
            <div className={styles.embla__slide} key={0}>
                <div className="w-full aspect-square tb:aspect-[2/1] relative " />
            </div>
            <div className={styles.embla__slide} key={1}>
                <div className="w-full aspect-square tb:aspect-[2/1] relative " />
            </div>
        </>
    );
};

const CardSlider = ({ thumbnailInfos, device }: { thumbnailInfos: thumbnailInfo[]; device: string }) => {
    thumbnailInfos.sort(randomSort);
    return thumbnailInfos.map((thumbnailInfo: thumbnailInfo, index: number) => {
        return (
            <div className={styles.embla__slide} key={index}>
                <Card thumbnailInfo={thumbnailInfo} device={device} />
            </div>
        );
    });
};

const Card = ({ thumbnailInfo, device }: { thumbnailInfo: thumbnailInfo; device: string }) => {
    return (
        <>
            <div className="w-full aspect-square tb:aspect-[2.3/1] relative">
                <Image
                    src={`${process.env.NEXT_PUBLIC_THUMBNAIL_URL}/${device}/${thumbnailInfo.fileName}`}
                    alt={thumbnailInfo.fileName.split(".")[0]}
                    fill
                    sizes="(min-width: 1500px) 1404px, calc(92.03vw + 42px)"
                    style={{ objectFit: "cover" }}
                    className="z-10 mx-auto border-y border-gray-400"
                    quality={95}
                    priority={thumbnailInfo.fileName.includes("1")}
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 w-full flex-center z-20 flex-cetner w-[90%] py-2">
                <Link href={thumbnailInfo.href} className="flex-center ">
                    <div className="w-72 tb:w-96 text-center tb:text-xl text-white font-bold">SHOP NOW</div>
                </Link>
            </div>
        </>
    );
};

function randomSort(a: any, b: any) {
    return Math.random() - 0.5;
}
