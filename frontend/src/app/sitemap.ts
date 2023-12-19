export default async function sitemap() {
    const site = process.env.NEXT_PUBLIC_FRONTEND_URL
    // const allSkus = await fetch(`${site}/api/get-all-product-sku`).then(res => res.json())
    // const productPages = allSkus.data.map((sku:number) => {
    //     return {
    //         url: `${site}/product/${sku}`,
    //         changeFrequency: 'daily',
    //         priority: 0.7,
    //         lastModified: new Date(),
    //     }
    // }
    // ) 

    return [
        {
            url: `${site}/`,
            changeFrequency: 'weekly',
            priority: 0.7,
            lastModified: new Date(),
        },
        {
            url: `${site}/brands`,
            changeFrequency: 'daily',
            priority: 0.7,
            lastModified: new Date(),
        },
        {
            url: `${site}/category/latest`,
            changeFrequency: 'daily',
            priority: 0.7,
            lastModified: new Date(),
        },
        {
            url: `${site}/category/shoes`,
            changeFrequency: 'daily',
            priority: 0.7,
            lastModified: new Date(),
        },
        {
            url: `${site}/category/clothing`,
            changeFrequency: 'daily',
            priority: 0.7,
            lastModified: new Date(),
        },
        {
            url: `${site}/category/accessory`,
            changeFrequency: 'daily',
            priority: 0.7,
            lastModified: new Date(),
        },
        // ...productPages
        
    ]
}