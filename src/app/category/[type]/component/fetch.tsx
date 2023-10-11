import { productCardProps } from "@/app/type";
import { filterMetaProps, initMetaProps } from "../type";
export interface responseProps {
    data: productCardProps[];
    meta: initMetaProps;
    currentPage: number;
    lastPage: number;
}

export const getInitCategory = async () => {
    const req = await fetch("http://127.0.0.1:8000/api/product/get-category");
    const result: responseProps = await req.json();
    return result;
};

export const getFilteredCategoryTest = async (meta: filterMetaProps | undefined, page: string) => {
    const req = await fetch(`http://127.0.0.1:8000/api/product/get-filtered-category?page=${page}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(meta),
    });
    const result: responseProps = await req.json();
    return result;
};
