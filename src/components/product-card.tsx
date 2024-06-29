import Image from 'next/image'
import Link from 'next/link'
import cn from '@/utils/cn'
import { KRW } from '@/utils/currency'
import { ProductProps } from '@/hooks/data/type'

const handleImageError = (errorNode: React.SyntheticEvent<HTMLImageElement>) => {
    const targetElement = errorNode.target as HTMLElement
    const parentDiv = targetElement.parentNode as HTMLDivElement
    parentDiv!.className = 'hidden'
}

export function ProductImage({
    sku,
    imgName,
    className,
}: {
    sku: string
    imgName: string
    className?: string
}) {
    const src = `${process.env.NEXT_PUBLIC_CDN}/product/${sku}/${imgName}.webp`
    const defaultOptions = 'bg-gray-50 relative w-full aspect-[1/1.2] mx-auto vignette rounded'

    return (
        <div className={cn(defaultOptions, className)}>
            <Image
                src={src}
                alt="상품이미지"
                fill
                className="object-cover"
                unoptimized
                onError={handleImageError}
            />
        </div>
    )
}

export function Description({ product }: { product: ProductProps }) {
    const { brand, productName, price, productId, intl } = product
    return (
        <div className="flex-col flex-center text-sub-black px-2 w-full text-center space-y-1">
            <div className="capitalize line-clamp-1 space-x-1">
                <span className="font-semibold">{brand}</span>
                <span> {productId}</span>
            </div>
            <div className="text-gray-500 line-clamp-1">{productName}</div>
            <div className="space-x-1">
                <span>{intl ? '해외배송' : '국내배송'} </span>
                <span>{KRW(price)}</span>
            </div>
        </div>
    )
}

export function ProductCard({ product }: { product: ProductProps }) {
    const { sku } = product

    return (
        <Link href={`/product/${sku}`} className="text-sub-black z-1 space-y-3">
            <ProductImage sku={String(sku)} imgName="main" />
            <Description product={product} />
        </Link>
    )
}
