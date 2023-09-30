import { cartProductCardProps } from "@/app/type";
import CartproductCardForm from "@/app/components/product-card/cart-product-card-form";

const CartproductCardArr = ({ arr }: { arr: cartProductCardProps[] }) => {
    return arr.map((item: cartProductCardProps) => {
        return CartproductCardForm({ ...item, countEnable: false });
    });
};

export default CartproductCardArr;
