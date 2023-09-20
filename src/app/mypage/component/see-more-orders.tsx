import { useEffect } from "react";

const header = "border-main-black text-center basis-1/4";
const item = "flex justify-evenly  text-center py-3 my-auto active:text-deep-gray cursor-pointer";
import { useState } from "react";

const mockAPI = [
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "0001",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
    {
        orderNumber: "9999",
        orderDate: "21-09-01 23:00:00",
        orderStatus: "결제완료",
        orderPrice: "100,000",
    },
];
interface SeeMoreOrdersProps {
    showInitalRows: number;
    seeMore: boolean;
    setSeeMore: (seeMore: boolean) => void;
}

export default function SeeMoreOrders({ showInitalRows, seeMore, setSeeMore }: SeeMoreOrdersProps) {
    const [orderList, setOrderList] = useState(mockAPI.slice(0, showInitalRows));

    const isOdd = (num: number) => {
        return num % 2 != 0;
    };

    const openToggle = () => {
        setSeeMore(!seeMore);
    };

    useEffect(() => {
        if (seeMore) {
            setOrderList(mockAPI);
        } else {
            setOrderList(mockAPI.slice(0, showInitalRows));
        }
    }, [seeMore, showInitalRows]);

    return (
        <div>
            <div className="max-h-[300px] overflow-auto">
                <div className="border-main-black justify-evenly">
                    <div className="flex justify-evenly">
                        <div className={`${header}`}>주문번호</div>
                        <div className={`${header}`}>주문일</div>
                        <div className={`${header}`}>상태</div>
                        <div className={`${header}`}>결제금액</div>
                    </div>
                    {orderList.map((order, idx) => (
                        <div className={`${item} ${isOdd(idx) && "bg-light-gray"}`} key={idx}>
                            <div className="m-auto basis-1/4 underline">{order.orderNumber}</div>
                            <div className="m-auto basis-1/4">{order.orderDate}</div>
                            <div className="m-auto basis-1/4">{order.orderStatus}</div>
                            <div className="m-auto basis-1/4">{order.orderPrice}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="border-b border-main-black flex-center active:bg-light-gray py-3 tracking-[0.2rem]"
                onClick={openToggle}>
                {seeMore ? "닫기" : "더보기"}
            </div>
        </div>
    );
}
