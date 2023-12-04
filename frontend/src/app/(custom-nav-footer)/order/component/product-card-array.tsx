import { cartProductCardProps } from "@/app/type";
import CartProductCardForm from "@/app/components/product-card/cart-product-card-form";

const CartproductCardArr = ({ arr }: { arr: cartProductCardProps[] }) => {
    return arr?.map((item: cartProductCardProps) => {
        const cartProductCardForm = { ...item, countEnable: false };
        return (
            <CartProductCardForm
                key={`${item.sku}-${item.size}`}
                props={cartProductCardForm}
                onDelete={false}
                countEnable={false}
                selectEnable={false}
            />
        );
    });
};

export default CartproductCardArr;
