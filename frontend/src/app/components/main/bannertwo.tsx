import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/components/carousel/styles.module.css'
import Carousel from '../carousel/EmblaCarouselDotButton'

export type thumbnailInfo = {
    fileName: string
    href: string
}

export default function Thumbnail({
    isMobile,
}: {
    isMobile: boolean | undefined
}) {
    return (
        <div className="scroll-bar-hidden aspect-[1/1.2] w-full tb:aspect-[3.1/1] pb-8">
            {isMobile ? 
            <CardMobile/> : <CardPc/>
            }
        </div>
    )
}

function CardMobile() {
    return (
        <>
            <div className="relative aspect-square w-full tb:aspect-[3/1]">
                <Image
                    src={`${process.env.NEXT_PUBLIC_THUMBNAIL_URL}/${'mobile'}/${"1.webp"}`}
                    alt={'banner'}
                    fill
                    sizes="1024px"
                    style={{ objectFit: 'cover' }}
                    className="z-10 mx-auto border-y border-gray-400"
                    unoptimized
                    priority
                />
            <div className="w-full flex-cetner absolute bottom-0 left-0 right-0 z-20 py-4">
                <Link href={"/category/brand/human%20made"} className="flex-center ">
                    <div className="text-border text-center font-bold text-sub-black ">
                        SHOP NOW
                    </div>
                </Link>
            </div>
            </div>
        </>
    )
}


function CardPc() {
    return (
        <>
            <div className="relative aspect-square w-full tb:aspect-[3/1]">
                <Image
                    src={`${process.env.NEXT_PUBLIC_THUMBNAIL_URL}/${'pc'}/${"1.webp"}`}
                    alt={'banner'}
                    fill
                    sizes="1024px"
                    style={{ objectFit: 'cover' }}
                    className="z-10 mx-auto border-y border-gray-400"
                    unoptimized
                    priority
                />
            <div className="w-full flex-cetner absolute bottom-0 left-0 right-0 z-20 py-4">
                <Link href={"/category/brand/human%20made"} className="flex-center ">
                    <div className="text-border text-center font-semibold text-sub-black text-xl">
                        SHOP NOW
                    </div>
                </Link>
            </div>
            </div>
        </>
    )
}
