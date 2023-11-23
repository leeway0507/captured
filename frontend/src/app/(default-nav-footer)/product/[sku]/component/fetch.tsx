export const getProduct = async (sku: string) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-product/${sku}`);
    return await req.json();
};
