import { useShoppingCart } from "../shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { cartProductCardProps } from "../type";

export default function Main() {
    const { mockDB, cartItems } = useShoppingCart();

    const CartItemArr = cartItems
        .map((item) => {
            const product = mockDB.find((product) => product.sku === item.id);
            if (product) return { ...product, size: item.size, quantity: item.quantity };
        })
        .filter((item): item is cartProductCardProps => Boolean(item));

    return (
        <>
            <div className="tb:hidden px-5">
                <MainMobile arr={CartItemArr} />
            </div>
            <div className="hidden tb:block px-5">
                <MainPc arr={CartItemArr} />
            </div>
        </>
    );
}
