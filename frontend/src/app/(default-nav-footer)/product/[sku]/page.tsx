import Client from "./client";
import MainPc from "./main-pc";
import MainMobile from "./main-mobile";
import { productCardProps } from "@/app/type";
import { getProduct } from "./component/fetch";
import { getFilterMetaProxy } from "@/app/(default-nav-footer)/category/[...pageType]/component/fetch";
import { categorySpec } from "@/app/(default-nav-footer)/category/[...pageType]/type";
import Footer from "@/app/components/nav-footer/component/footer";

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: { sku: string };
    searchParams: { [key: string]: string | undefined };
}) {
    const product: productCardProps = await getProduct(params.sku).then((res) => res.data);
    const title = `${product.korBrand} ${product.korProductName} | ${product.productId}`;
    const description = `전세계 재고를 찾아 검거하는 캡쳐드! 내가 원하는 그 제품, 캡쳐드에서 먼저 찾아보세요. ${product.brand} ${product.productName} `;
    const openGraph = {
        title: title,
        description: "전세계 재고를 찾아 검거하는 캡쳐드! 내가 원하는 그 제품, 캡쳐드에서 먼저 찾아보세요.",
        url: "https://we-captured.kr/",
        siteName: "캡쳐드",
        images: `${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${product.sku}/main.webp`,
        type: "website",
    };
    return { title: title, description: description, openGraph: openGraph };
}

export default async function Product({
    params,
    searchParams,
}: {
    params: { sku: string };
    searchParams: { [key: string]: string | undefined };
}) {
    const res = await getProduct(params.sku);

    const product: productCardProps = res.data;

    const filterMeta = await getFilterMetaProxy();
    const defaultSizeArr = filterMeta["category"][product.category as keyof categorySpec]?.["sizeArray"];

    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: `${product.korBrand} ${product.korProductName} | ${product.productId}`,
        image: `${process.env.NEXT_PUBLIC_MOBILE_IMAGE_URL}/product/${product.sku}/main.webp`,
        description: `전세계 재고를 찾아 검거하는 캡쳐드! 내가 원하는 그 제품, 캡쳐드에서 먼저 찾아보세요. ${product.brand} ${product.productName} | ${product.productId} | ${product.color} `,
        productID: `${product.productId}`,
        brand: {
            "@type": "Brand",
            name: `${product.brand}`,
        },
        offers: {
            "@type": "Offer",
            price: `${product.price}`,
            priceCurrency: "KRW",
            availability: product.size.length > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
    };

    return (
        <>
            <section>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </section>

            <Client
                Mobile={<MainMobile product={product} defaultSizeArr={defaultSizeArr} />}
                Pc={<MainPc product={product} defaultSizeArr={defaultSizeArr} />}
                data={product}
            />
            <Footer />
        </>
    );
}
