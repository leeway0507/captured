import Main from "./main";
import { getOrderHistory } from "../mypage/component/order/fetch-server";
import { getServerSession } from "next-auth/next";
import { options } from "../../api/auth/[...nextauth]/options";

export default async function Page() {
    const session = await getServerSession(options);
    const orderHistoryArray = await getOrderHistory(session?.user.accessToken!);
    return <Main />;
}
