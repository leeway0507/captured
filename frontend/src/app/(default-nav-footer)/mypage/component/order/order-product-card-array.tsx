import { orderDetailProductCardProps } from "@/app/type";
import CartProductCardForm from "@/app/components/product-card/cart-product-card-form";
import Link from "next/link";

const OrderDetailProductCardArray = ({ orderItemList }: { orderItemList: orderDetailProductCardProps[] }) => {
    return orderItemList.map((item: orderDetailProductCardProps, idx: number) => {
        const cartProductCardForm = { ...item, countEnable: false };
        return (
            <div key={idx} className="relative py-2">
                <div className="absolute top-2 left-[150px] px-2  text-xs underline ">
                    {item.deliveryNumber == undefined ? (
                        <div>배송 준비 중</div>
                    ) : (
                        <Link href="" className="link-animation">
                            {item.deliveryCompany} - {item.deliveryNumber}
                        </Link>
                    )}
                </div>
                <div className="border-b border-deep-gray">
                    <CartProductCardForm
                        key={item.sku}
                        props={cartProductCardForm}
                        onDelete={false}
                        countEnable={false}
                        selectEnable={false}
                    />
                </div>
            </div>
        );
    });
};

export default OrderDetailProductCardArray;
