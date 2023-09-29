import { useEffect, useState } from "react";
import { addressFormProps, OrderDetailProps } from "../../type";
import detailOrder from "./order-detail";
import { mockDetailAPI } from "../mock-apis";
import { useMyPage } from "../../mypage-provider";
import { scrollToTop } from "@/app/components/utils/scroll";
import { useRouter, useSearchParams } from "next/navigation";
import * as api from "../../apis";
import ProductCheckOut from "@/app/cart/component/product-check-out";

//css
const header = "border-main-black text-center basis-1/4";
const item = "flex justify-evenly  text-center py-3 my-auto link-animation";

interface OrderTableProps {
    showInitalRows: number;
    seeMore: boolean;
    setSeeMore: (seeMore: boolean) => void;
}

const isOdd = (num: number) => {
    return num % 2 != 0;
};

export default function OrderTable({ showInitalRows, seeMore, setSeeMore }: OrderTableProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { orderArray } = useMyPage();
    const [orderList, setOrderList] = useState(orderArray.slice(0, showInitalRows));
    const [openDetail, setOpenDetail] = useState(false);
    const [targetDetail, setTagetDetail] = useState({
        orderId: "",
        orderNumber: "",
        orderDate: "",
        orderStatus: "",
        orderPrice: "",
        orderAddress: { phone: "0" } as addressFormProps,
        orderItemList: [],
    } as OrderDetailProps);

    useEffect(() => {
        if (seeMore) {
            setOrderList(orderArray);
        } else {
            setOrderList(orderArray.slice(0, showInitalRows));
        }
    }, [seeMore, showInitalRows, orderArray]);

    //history stack
    const historyBackHandler = () => {
        searchParams.has("orderId")
            ? //api-call - 주문배송상세
              //status : 제작필요
              //type : GET
              //url : /api/mypage/order/order-detail
              //function : get_order_detail(order_id) => targetDetailProps
              // api.getOrderDetail

              (setTagetDetail(mockDetailAPI), setOpenDetail(true))
            : setOpenDetail(false);
    };
    useEffect(() => {
        historyBackHandler();
    }, [searchParams]);

    const openToggle = () => {
        setSeeMore(!seeMore);
    };

    const openDetailToggle = (e: React.MouseEvent) => {
        const orderId = e.currentTarget.getAttribute("aria-label");
        router.push(`/mypage/?orderId=${orderId}`);
        setOpenDetail(true);
        scrollToTop();
    };

    const closeDetailToggle = () => {
        router.push("/mypage?pageindex=0");
        scrollToTop();
    };

    return (
        <div>
            <div className={`overflow-auto ${openDetail && "hidden"}`}>
                <div className={`border-main-black justify-evenly relative`}>
                    <div className="flex justify-evenly bg-white pb-4">
                        <div className={`${header}`}>주문번호</div>
                        <div className={`${header}`}>주문일</div>
                        <div className={`${header}`}>상태(운송장번호)</div>
                        <div className={`${header}`}>결제금액</div>
                    </div>
                    {orderList.map((order, idx) => (
                        <div
                            className={`${item} ${isOdd(idx) && "bg-light-gray"}`}
                            key={idx}
                            onClick={(e) => {
                                openDetailToggle(e);
                            }}
                            aria-label={order.orderId}>
                            <div className="m-auto basis-1/4 underline">{order.orderNumber}</div>
                            <div className="m-auto basis-1/4">{order.orderDate}</div>
                            <div className="m-auto basis-1/4">
                                <div>{order.orderStatus}</div>
                            </div>
                            <div className="m-auto basis-1/4">{order.orderPrice}</div>
                        </div>
                    ))}
                </div>
                <div
                    className="border-b border-main-black flex-center active:bg-light-gray py-3 mb-6 tracking-[0.2rem]"
                    onClick={openToggle}>
                    {seeMore ? "닫기" : "더보기"}
                </div>
            </div>
            <div className={`${!openDetail && "hidden"}`}>
                <div className="">{detailOrder(targetDetail)}</div>
                <ProductCheckOut arr={targetDetail.orderItemList} />
                <div className="my-8 mx-16 black-bar-xl" onClick={closeDetailToggle}>
                    확인
                </div>
            </div>
        </div>
    );
}
