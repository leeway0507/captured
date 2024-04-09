import ProductCard from '@/app/(default-nav-footer)/category/[...pageType]/component/infinite-scroll/product-card'

import Link from 'next/link'
import { productCardProps } from '@/app/type'
import { getCategoryProxy } from './fetch'
import Image from 'next/image'

export default async function BrandItemsLayOut({
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
            <div key={item.sku} className="mx-auto w-full px-2">
                <ProductCard idx={item.sku} props={item} />
            </div>
        ))
    }

    return (
        <>
            <div className="mx-auto pb-4 font-bold uppercase tb:pb-16 tb:text-3xl">
                {brandName}
            </div>
            <div className="mx-auto grid max-h-full tb:aspect-[1.8/1] tb:max-h-[90vh] tb:grid-cols-9">
                <Link
                    href={`/category/brand/${brandName}`}
                    className="relative aspect-[0.8/1] h-full py-8 hover:opacity-90 tb:col-span-4 "
                >
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
                <div className="h-full tb:col-span-5 tb:aspect-square ">
                    <div className="grid h-full grid-cols-2 grid-rows-3 py-3 tb:grid-cols-3 tb:grid-rows-2 tb:px-2 tb:py-0">
                        <ItemList data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}
