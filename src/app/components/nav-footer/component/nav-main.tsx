import NavMobile from "./nav-mobile";
import NavPc from "./nav-pc";
import NavMobileSideBar from "./nav-mobile-sidebar";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";

export default function NavMain() {
    const { navOpen, setNavOpen, isMobile } = useShoppingCart();
    return (
        <>
            {isMobile ? (
                <>
                    <NavMobile />
                    <NavMobileSideBar isOpen={navOpen} setIsOpen={setNavOpen} />
                </>
            ) : (
                <NavPc />
            )}
        </>
    );
}
