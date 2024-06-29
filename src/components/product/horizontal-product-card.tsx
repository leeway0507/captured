'use client'

import { KRW } from '@/utils/currency'
import { ProductImage } from './product-card'

interface ProductHorizontalCardProps {
    sku: number
    brand: string
    productName: string
    productId: string
    price: number
    intl: boolean
    size: string
    quantity: number
}

function OrderProductDescription(props: Omit<ProductHorizontalCardProps, 'sku'>) {
    const { brand, productName, price, productId, intl, size, quantity } = props
    return (
        <div className="flex flex-col w-full justify-center  md: ">
            <span className="text-base md:text-lg">{brand}</span>
            <span className="text-gray-500 line-clamp-1">{productName}</span>
            <span className="uppercase text-gray-500">{productId}</span>
            <div className="flex justify-between">
                <span>{size}</span>
                <span className="underline text-gray-500">{intl ? '해외배송' : '국내배송'}</span>
            </div>
            <div className="flex justify-between pt-2">
                <span>{`수량 : ${quantity}`}</span>
                <span>{KRW(price)}</span>
            </div>
        </div>
    )
}

export function ProductHorizontalCard(props: ProductHorizontalCardProps) {
    const { sku, ...rest } = props
    return (
        <div className="flex gap-4">
            <ProductImage
                sku={sku.toString()}
                imgName="main"
                className="max-w-[100px] md:max-w-[125px] lg:max-w-[150px]"
            />
            <OrderProductDescription {...rest} />
        </div>
    )
}
