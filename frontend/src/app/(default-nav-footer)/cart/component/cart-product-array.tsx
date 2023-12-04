import CartProductCardForm from "@/app/components/product-card/cart-product-card-form";
import { cartProductCardProps } from "../../../type";

export default function CartProductCardArr({ arr }: { arr: cartProductCardProps[] }) {
    return arr?.map((item: cartProductCardProps, idx: number) => {
        const cartProductCardForm = { ...item, countEnable: false };
        return (
            <div key={idx} className="relative mb-5">
                <CartProductCardForm key={item.sku} props={cartProductCardForm} onDelete countEnable selectEnable />
            </div>
        );
    });
}
