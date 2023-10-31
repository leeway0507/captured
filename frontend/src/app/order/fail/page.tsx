import { redirect } from "next/navigation";
import Main from "./main";

interface searchParams {
    code: string;
    message: string;
}

export default async function Page({
    params,
    searchParams,
}: {
    params: { pageType: string[] };
    searchParams: searchParams;
}) {
    return (
        <>
            <Main />
        </>
    );
}
