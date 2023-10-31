import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import * as api from "./fetch-server";
import OrderTable from "./order-table";
import OrderDetail from "./order-detail";
import { orderHistoryProps } from "@/app/type";

const OrderHistory = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    const session = await getServerSession(options);
    const orderId = searchParams.orderId;
    const orderHistoryArray = await api.getOrderHistory(session?.user.accessToken!);

    if (orderId) {
        const targetOrder = orderHistoryArray.find((order: orderHistoryProps) => order.orderId === orderId);
        const orderAddress = await api.getUserAddressInfo(targetOrder.addressId, session?.user.accessToken!);
        const orderItemList = await api.getOrderRows(targetOrder.orderId, session?.user.accessToken!);

        return <OrderDetail targetOrder={targetOrder} orderAddress={orderAddress} orderItemList={orderItemList} />;
    }
    return <OrderTable showInitalRows={3} orderHistoryArray={orderHistoryArray} />;
};

export default OrderHistory;
