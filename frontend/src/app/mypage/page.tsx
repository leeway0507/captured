import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import Main from "./main";
import OrderHistory from "./component/order/order";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import SigninAlertModal from "../components/modal/signin-alert-modal-without-btn";

export default async function Page() {
    const session = await getServerSession(options);

    if (session === null) return <SigninAlertModal />;
    return (
        <NavFooter>
            <Main orderHistory={<OrderHistory />} />
        </NavFooter>
    );
}
