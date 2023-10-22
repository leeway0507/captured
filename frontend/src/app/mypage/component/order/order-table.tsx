"use client";
import { useState } from "react";
import { orderHistoryProps } from "@/app/type";
import OrderDetailForm from "./order-detail";
import { scrollToTop } from "@/app/components/utils/scroll";
import { useRouter } from "next/navigation";
//css
const header = "border-main-black text-center basis-1/4";
const item = "flex justify-evenly  text-center py-3 my-auto link-animation";

const isOdd = (num: number) => {
    return num % 2 != 0;
};

export default function OrderTable({
    showInitalRows,
    orderHistoryArray,
}: {
    showInitalRows: number;
    orderHistoryArray: orderHistoryProps[];
}) {
    const router = useRouter();

    const [seeMore, setSeeMore] = useState(false);
    const [openDetailOrder, setOpenDetailOrder] = useState(false);
    const [targetOrder, setTargetOrder] = useState<orderHistoryProps>();
    const [orderList, setOrderList] = useState(orderHistoryArray ? orderHistoryArray.slice(0, showInitalRows) : []);
    const openToggle = (value: boolean) => {
        setSeeMore(value);
        value ? setOrderList(orderHistoryArray) : setOrderList(orderHistoryArray.slice(0, showInitalRows));
    };

    const openDetailOrderToggle = (e: React.MouseEvent) => {
        const orderId = e.currentTarget.getAttribute("data-orderid");
        router.push(`/mypage/?orderId=${orderId}`);
        setOpenDetailOrder(true);
        setTargetOrder(orderHistoryArray.find((order) => order.orderId === orderId));
        scrollToTop();
    };

    return (
        <div className="max-w-2xl m-auto w-full">
            {!openDetailOrder ? (
                <div className={`overflow-auto`}>
                    <div className={`border-main-black justify-evenly relative`}>
                        <div className="flex justify-evenly bg-white pb-4">
                            <div className={`${header}`}>주문번호</div>
                            <div className={`${header}`}>주문일</div>
                            <div className={`${header}`}>주문상태</div>
                            <div className={`${header}`}>결제금액</div>
                        </div>
                        {orderList.map((order, idx) => (
                            <div
                                className={`${item} ${isOdd(idx) && "bg-light-gray"}`}
                                key={idx}
                                onClick={(e) => {
                                    openDetailOrderToggle(e);
                                }}
                                data-orderid={order.orderId}>
                                <div className="m-auto basis-1/4 underline">{order.userOrderNumber}</div>
                                <div className="m-auto basis-1/4 text-xs">
                                    {order.orderedAt.split("T").map((v, idx) => {
                                        return <div key={idx}>{v}</div>;
                                    })}
                                </div>
                                <div className="m-auto basis-1/4">
                                    <div>{order.orderStatus}</div>
                                </div>
                                <div className="m-auto basis-1/4">{order.orderTotalPrice}</div>
                            </div>
                        ))}
                    </div>
                    {orderHistoryArray.length === 0 ? (
                        <div className="flex-center py-3 my-6 text-xl">주문내역이 없습니다.</div>
                    ) : (
                        orderList.length > showInitalRows && (
                            <div
                                className="border-b border-main-black flex-center py-3 mb-6 tracking-[0.2rem] link-animation"
                                onClick={() => {
                                    openToggle(!seeMore);
                                }}>
                                {seeMore ? "닫기" : "더보기"}
                            </div>
                        )
                    )}
                </div>
            ) : (
                <div>
                    <OrderDetailForm orderHistory={targetOrder} setOpenDetailOrder={setOpenDetailOrder} />
                </div>
            )}
        </div>
    );
}
