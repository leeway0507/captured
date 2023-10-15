import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import * as api from "./fetch-server";
import OrderTable from "./order-table";

const OrderHistory = async () => {
    const session = await getServerSession(options);
    const orderHistoryArray = await api.getOrderHistory(session?.user.accessToken!);
    return <OrderTable showInitalRows={3} orderHistoryArray={orderHistoryArray} />;
};

export default OrderHistory;
