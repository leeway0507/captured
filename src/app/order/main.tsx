import { useShoppingCart } from "../shopping-cart-context";
import MobileMain from "./main-mobile";
import MobilePc from "./main-pc";

export default function Main() {
    return (
        <>
            <div className="tb:hidden h-full">
                <MobileMain />
            </div>
            <div className="hidden tb:block h-full">
                <MobilePc />
            </div>
        </>
    );
}
