import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/components/carousel/styles.module.css'
import Carousel from '../carousel/EmblaCarouselDotButton'

export type thumbnailInfo = {
    fileName: string
    href: string
}

export default function Thumbnail({
    thumbnailInfos,
    isMobile,
}: {
    thumbnailInfos: thumbnailInfo[] | undefined
    isMobile: boolean | undefined
}) {
    return (
        <div className="scroll-bar-hidden aspect-[1/1.2] w-full tb:aspect-[2.1/1]">
            <Carousel autoPlay={false}>
                {thumbnailInfos == undefined ? (
                    <DefaultSlider />
                ) : (
                    <CardSlider
                        thumbnailInfos={thumbnailInfos}
                        device={isMobile ? 'mobile' : 'pc'}
                    />
                )}
            </Carousel>
        </div>
    )
}

const DefaultSlider = () => {
    // card를 두 개 이상으로 설정해야 문제없이 작동함. 이대로 둘 것
    return (
        <>
            <div className={styles.embla__slide} key={0}>
                <div className="relative aspect-square w-full tb:aspect-[2/1] " />
            </div>
            <div className={styles.embla__slide} key={1}>
                <div className="relative aspect-square w-full tb:aspect-[2/1] " />
            </div>
        </>
    )
}

const CardSlider = ({
    thumbnailInfos,
    device,
}: {
    thumbnailInfos: thumbnailInfo[]
    device: string
}) => {
    thumbnailInfos.sort(randomSort)
    return thumbnailInfos.map((thumbnailInfo: thumbnailInfo, index: number) => {
        return (
            <div className={`${styles.embla__slide}`} key={index}>
                <Card thumbnailInfo={thumbnailInfo} device={device} />
            </div>
        )
    })
}

const Card = ({
    thumbnailInfo,
    device,
}: {
    thumbnailInfo: thumbnailInfo
    device: string
}) => {
    return (
        <>
            <div className="relative aspect-square w-full tb:aspect-[2.2/1]">
                <Image
                    src={`${process.env.NEXT_PUBLIC_THUMBNAIL_URL}/${device}/${thumbnailInfo.fileName}`}
                    alt={thumbnailInfo.fileName.split('.')[0]}
                    fill
                    sizes="(min-width: 1500px) 1404px, calc(92.03vw + 42px)"
                    style={{ objectFit: 'cover' }}
                    className="z-10 mx-auto border-y border-gray-400"
                    unoptimized={true}
                    priority
                />
            </div>
            <div className="flex-cetner absolute bottom-0 left-0 right-0 z-20 w-[90%] py-4">
                <Link href={thumbnailInfo.href} className="flex-center ">
                    <div className="text-border w-72 text-center font-bold text-white tb:w-96 tb:text-2xl">
                        SHOP NOW
                    </div>
                </Link>
            </div>
        </>
    )
}

function randomSort(a: any, b: any) {
    return Math.random() - 0.5
}
