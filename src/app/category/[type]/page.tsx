import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import { Main } from "./main";

export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // console.log(params);
    // console.log("page_params", searchParams);

    let filter = undefined;
    if (searchParams.filter && typeof searchParams.filter === "string") {
        filter = searchParams.filter.slice(0, -2) + "}";
        filter = JSON.parse(filter);
    }
    let page = undefined;
    if (searchParams.page && typeof searchParams.page === "string") {
        page = searchParams.page;
    }
    return (
        <>
            <NavFooter>
                <Main filter={filter} page={page} />
            </NavFooter>
        </>
    );
}
