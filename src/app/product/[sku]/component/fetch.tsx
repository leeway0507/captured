export const getProduct = async (sku: string) => {
    const req = await fetch(`http://127.0.0.1:8000/api/product/get-product/${sku}`);
    return await req.json();
};
