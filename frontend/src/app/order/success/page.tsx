import { redirect } from "next/navigation";
import Main from "./main";

interface searchParams {
    paymentType: string;
    orderId: string;
    paymentKey: string;
    amount: string;
}

export default async function Page({
    params,
    searchParams,
}: {
    params: { pageType: string[] };
    searchParams: searchParams;
}) {
    const { paymentType, orderId, paymentKey, amount } = searchParams;

    // if (paymentType === undefined || orderId === undefined || paymentKey === undefined || amount === undefined) {
    //     return redirect("/");
    // }

    return (
        <>
            <Main searchParams={searchParams} />
        </>
    );
}
