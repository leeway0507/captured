import { cartProductCardProps } from "@/app/type";
import CartproductCardForm from "@/app/components/product-card/cart-product-card-form";

const OrderProducts = (cart: cartProductCardProps[]) => {
    return cart.map((item: cartProductCardProps, idx: number) => {
        return CartproductCardForm({ ...item });
    });
};

export default OrderProducts;
