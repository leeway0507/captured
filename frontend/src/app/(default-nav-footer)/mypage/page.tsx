import Main from "./main";
import OrderHistory from "./component/order/order-history";
import { getServerSession } from "next-auth/next";
import { options } from "../../api/auth/[...nextauth]/options";
import SigninAlertModal from "../../components/modal/signin-alert-modal-without-btn";
import Footer from "../../components/nav-footer/component/footer";
import { BottomNavBar } from "../../components/nav-footer/bottom-nav-bar";

export default async function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | undefined };
}) {
    const session = await getServerSession(options);

    if (session === null) return <SigninAlertModal />;

    return (
        <>
            <Main orderHistory={<OrderHistory searchParams={searchParams} />} />
            <Footer />
            <BottomNavBar nav="mypage" />
        </>
    );
}
