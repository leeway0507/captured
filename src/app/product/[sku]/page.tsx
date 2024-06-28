import fetchProduct from '@/hooks/data/product-fetch'
import { Suspense } from 'react'
import Spinner from '@/components/spinner/spinner'
import { productMetaData, JsonLDComponent } from './metadata'
import Nav from '../../../components/common/nav'
import Product from './product'

interface ParamsProps {
    sku: string
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
    const product = await fetchProduct(params.sku)
    return productMetaData(product)
}

async function Page({ params }: { params: ParamsProps }) {
    const product = await fetchProduct(params.sku)
    return (
        <>
            <JsonLDComponent product={product} />
            <Nav hideMobileBottom />
            <main className="page-container page-max-frame px-2">
                <Suspense fallback={<Spinner />}>
                    <Product product={product} />
                </Suspense>
            </main>
        </>
    )
}

export default Page
