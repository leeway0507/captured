import ProductCard from '@/app/(default-nav-footer)/category/[...pageType]/component/infinite-scroll/product-card'

import Link from 'next/link'
import { productCardProps } from '@/app/type'
import { getCategoryProxy } from './fetch'
import Image from 'next/image'

export default async function BrandItemsLayOutTop({
    brandName,
}: {
    brandName: string
}) {
    const filter = {
        sortBy: '최신순',
        brand: brandName,
    }

    const data = await getCategoryProxy(filter, 1).then((res) => {
        return res.data
    })

    const ItemList = ({ data }: { data: productCardProps[] }) => {
        return data.slice(0, 6).map((item) => (
            <div
                key={item.sku}
                className="flex-none basis-[40%] tb:basis-[22%]"
            >
                <ProductCard idx={item.sku} props={item} />
            </div>
        ))
    }

    const ItemListSkeleton = () => {
        return [1, 2, 3, 4, 5].map((v) => (
            <div
                key={v}
                className="flex-none basis-[45%] animate-pulse tb:basis-[20%]"
            >
                <div className="flex-center aspect-square w-full grow rounded-xl bg-gray-300"></div>
                <div className="mt-2 h-3 w-full rounded-full bg-gray-300"></div>
                <div className="mt-2 h-3 w-full rounded-full bg-gray-300"></div>
            </div>
        ))
    }

    return (
        <>
            <div className="mx-auto grid">
                <Link
                    href={`/category/brand/${brandName}`}
                    className="relative aspect-[1.5/1] w-full hover:opacity-90 tb:aspect-[2.5/1] "
                >
                    <div className="flex-center absolute z-20 h-full w-full flex-col gap-2 text-white">
                        <div className="mx-auto text-3xl font-bold uppercase">
                            {brandName}
                        </div>
                        <div className="underline-offset-3 text-lg underline">
                            SHOP NOW
                        </div>
                    </div>
                    <div className="absolute z-10 h-full w-full bg-black/20 opacity-50 " />
                    <Image
                        src={`/layout/${brandName}.jpg`}
                        alt="test"
                        sizes="1200px"
                        quality={95}
                        className="object-cover"
                        fill
                        priority
                    />
                </Link>
                <div className="h-full overflow-hidden tb:mx-auto">
                    <div className="scroll-bar-x flex w-full gap-2 p-2 tb:gap-4 tb:py-4 ">
                        {data.length === 0 ? (
                            <ItemListSkeleton />
                        ) : (
                            <ItemList data={data} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
