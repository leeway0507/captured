import Main from "./main";

import { getAddressProxy } from "../../(default-nav-footer)/mypage/component/fetch";
import { getServerSession } from "next-auth/next";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(options);
    const addressArray = await getAddressProxy(session?.user.accessToken);

    if (session == null) return redirect("/auth/signin");

    return <Main addressArray={addressArray} userInfo={session.user} />;
}
