import { useShoppingCart } from "../shopping-cart-context";
import MobileMain from "./main-mobile";
import MobilePc from "./main-pc";

export default function Cart() {
    return (
        <>
            <>
                <div className="tb:hidden">
                    <MobileMain />
                </div>
                <div className="hidden tb:block">
                    <MobilePc />
                </div>
            </>
        </>
    );
}
