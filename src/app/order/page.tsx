import Main from "./main";
import ContextWrapper from "../components/context/context-wrapper";
import Footer from "../components/nav-footer/component/footer";
import { getAddress } from "../mypage/component/fetch";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import SigninAlertModal from "../components/modal/signin-alert-modal-without-btn";

export default async function Page() {
    const session = await getServerSession(options);

    const addressArray = await getAddress(session?.user.accessToken);

    if (session == null) return <SigninAlertModal />;

    return (
        <ContextWrapper>
            <div className="custom-container">
                <div className="grow">
                    <Main addressArray={addressArray} />
                </div>
                <Footer />
            </div>
        </ContextWrapper>
    );
}
