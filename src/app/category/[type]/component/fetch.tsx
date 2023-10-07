import { productCardProps } from "@/app/type";
interface productCardLocalProps extends Omit<productCardProps, "sku"> {
    sku: string;
}

export const getCategory = async () => {
    const req = await fetch("http://127.0.0.1:8000/api/product/get-category");
    const data: [] = await req.json();

    return data;
};
