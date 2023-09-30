import { orderDetailProductCardProps } from "@/app/mypage/type";
import CartProductCardForm from "@/app/components/product-card/cart-product-card-form";
import Link from "next/link";

const OrderDetailProductCardArray = (props: orderDetailProductCardProps[]) => {
    return props.map((item: orderDetailProductCardProps, idx: number) => {
        return (
            <div key={idx} className="relative my-4">
                <div className="absolute -top-2 right-0  text-xs underline ">
                    {item.deliveryNumber == "-" ? (
                        <div>배송 준비 중</div>
                    ) : (
                        <Link href="" className="link-animation">
                            {item.deliveryCompany} - {item.deliveryNumber}
                        </Link>
                    )}
                </div>
                <div className="my-4 border-b border-deep-gray">
                    <CartProductCardForm {...item} countEnable={false} />
                </div>
            </div>
        );
    });
};

export default OrderDetailProductCardArray;
