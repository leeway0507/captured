import { Main } from "./main";

export default function Page({
    params,
    searchParams,
}: {
    params: { pageType: string[] };
    searchParams: { [key: string]: string | undefined };
}) {
    // console.log("---------Page---------");
    // console.log(params);

    return <Main searchParams={searchParams} params={params} />;
}
