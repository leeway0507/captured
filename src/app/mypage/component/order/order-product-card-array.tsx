import { orderDetailProductCardProps } from "@/app/mypage/type";
import CartProductCardForm from "@/app/components/product-card/cart-product-card-form";
import Link from "next/link";

const OrderDetailProductCardArray = (props: orderDetailProductCardProps[]) => {
    return props.map((item: orderDetailProductCardProps, idx: number) => {
        return (
            <div key={idx} className="relative">
                <div className="absolute top-0 right-0 mt-4 me-3  text-sm underline">
                    {item.deliveryNumber == "-" ? (
                        <div>배송 준비 중</div>
                    ) : (
                        <Link href="" className="link-animation">
                            {item.deliveryCompany} - {item.deliveryNumber}
                        </Link>
                    )}
                </div>
                <CartProductCardForm {...item} countEnable={false} />
            </div>
        );
    });
};

export default OrderDetailProductCardArray;
