import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import { Main } from "./main";

export default function Page({
    params,
    searchParams,
}: {
    params: { pageType: string[] };
    searchParams: { [key: string]: string | undefined };
}) {
    console.log("---------Page---------");
    console.log(params);

    return (
        <>
            <NavFooter>
                <Main searchParams={searchParams} params={params} />
            </NavFooter>
        </>
    );
}
