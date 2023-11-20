import { setBackendEnvAPI } from "@/app/components/utils/env-utiils";

export const getProduct = async (sku: string) => {
    const req = await fetch(`${setBackendEnvAPI()}/api/product/get-product/${sku}`);
    return await req.json();
};
