import { redirect } from "next/navigation";

const Success = async ({
    params,
    searchParams,
}: {
    params: { slug: string[] };
    searchParams: { [key: string]: string | undefined };
}) => {
    console.log(params, searchParams);

    const param = params.slug.reduce((acc, cur) => {
        return acc + "/" + cur;
    }, "");

    const queryParam = Object.keys(searchParams).reduce((acc, cur) => {
        return acc + "&" + cur + "=" + searchParams[cur];
    }, "");

    redirect(param + queryParam);
};

export default Success;
