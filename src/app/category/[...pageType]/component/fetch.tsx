import { productCardProps } from "@/app/type";
import { initFilterMetaProps, filterRequestProps } from "../type";
export interface responseProps {
    data: productCardProps[];
    currentPage: number;
    lastPage: number;
}

export const getCategory = async (filter: filterRequestProps | undefined, page: string | number) => {
    // console.log("----------getCategory----------");
    // console.log(filter);
    // console.log(page);

    const req = await fetch(`http://127.0.0.1:8000/api/product/get-category?page=${page}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
    });
    const result: responseProps = await req.json();
    return result;
};

export const getFilterMeta = async () => {
    const req = await fetch("http://127.0.0.1:8000/api/product/get-filter-meta");
    const result: initFilterMetaProps = await req.json();
    return result;
};
