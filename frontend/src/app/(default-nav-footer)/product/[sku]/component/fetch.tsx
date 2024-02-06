export const getProduct = async (sku: string) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_GOLANG_API_URL}/api/product/product/${sku}`);
    return { status: req.status, data: await req.json() };
};
