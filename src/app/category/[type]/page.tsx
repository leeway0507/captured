import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import { Main } from "./main";

export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | undefined };
}) {
    console.log("---------Page---------");
    console.log(searchParams);

    return (
        <>
            <NavFooter>
                <Main params={searchParams} />
            </NavFooter>
        </>
    );
}
