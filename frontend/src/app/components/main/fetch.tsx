import { filterRequestProps } from "@/app/(default-nav-footer)/category/[...pageType]/type";
import { responseProps } from "@/app/(default-nav-footer)/category/[...pageType]/component/fetch";

export const getCategoryProxy = async (filter: filterRequestProps | undefined, page: string | number) => {
    const req = await fetch(`http://127.0.0.1:3000/api/get-category?page=${page}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
    });
    const result: responseProps = await req.json();
    return result;
};
