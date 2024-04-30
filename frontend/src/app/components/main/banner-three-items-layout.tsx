import Image from 'next/image'

export default async function BannerThreeItemsLayOut() {
    return (
        <div className="aspect-sqaure mx-auto grid w-screen max-w-[1660px] grid-cols-6 gap-1 px-4 ">
            <div className="relative col-span-3 aspect-square w-full">
                <Image
                    src={`/test-4.jpg`}
                    alt="test"
                    sizes="1200px"
                    quality={95}
                    className="rounded-sm object-cover"
                    fill
                    priority
                />
            </div>
            <div className="relative col-span-3 aspect-square w-full">
                <Image
                    src={`/test-5.avif`}
                    alt="test"
                    sizes="1200px"
                    quality={95}
                    className="rounded-sm object-cover"
                    fill
                    priority
                />
            </div>

            <div className="relative col-span-2 aspect-square w-full">
                <Image
                    src={`/test.jpg`}
                    alt="test"
                    sizes="1200px"
                    quality={95}
                    className="rounded-sm object-cover"
                    fill
                    priority
                />
            </div>
            <div className="relative col-span-2 aspect-square w-full">
                <Image
                    src={`/test-2.jpg`}
                    alt="test"
                    sizes="1200px"
                    quality={95}
                    className="rounded-sm object-cover"
                    fill
                    priority
                />
            </div>
            <div className="relative col-span-2 aspect-square w-full">
                <Image
                    src={`/test-3.avif`}
                    alt="test"
                    sizes="1200px"
                    quality={95}
                    className="rounded-sm object-cover"
                    fill
                    priority
                />
            </div>
        </div>
    )
}
