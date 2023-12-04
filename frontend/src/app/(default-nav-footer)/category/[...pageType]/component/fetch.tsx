import { productCardProps } from "@/app/type";
import { initFilterMetaProps, filterRequestProps } from "../type";

export interface responseProps {
    data: productCardProps[];
    currentPage: number;
    lastPage: number;
}

export const getCategory = async (filter: filterRequestProps | undefined, page: string | number) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-category?page=${page}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
    });
    const result: responseProps = await req.json();
    return result;
};

export const getFilterMetaProxy = async () => {
    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const req = await fetch(`${dynamicUrl}/api/get-filter-meta`);
    const result = await req.json();
    return result;
};
