import { Main } from "./main";
import { BottomNavBar } from "@/app/components/nav-footer/bottom-nav-bar";
import Footer from "@/app/components/nav-footer/component/footer";
export default function Page({
    params,
    searchParams,
}: {
    params: { pageType: string[] };
    searchParams: { [key: string]: string | undefined };
}) {
    return (
        <>
            <Main searchParams={searchParams} params={params} />
            <Footer />
            <BottomNavBar nav="shop" />
        </>
    );
}
