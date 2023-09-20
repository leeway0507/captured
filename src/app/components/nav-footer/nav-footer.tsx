import NavigationMobile from "./navigation-mobile";
import NavigationPc from "./navigation-pc";
import Footer from "./footer";
import Nav from "./nav-side-bar";
import { useShoppingCart } from "../../shopping-cart-context";

interface NavFooterProps {
    children: React.ReactNode;
}

export default function NavFooter({ children }: NavFooterProps) {
    const { navOpen, setNavOpen } = useShoppingCart();
    return (
        <main className="custom-container">
            <NavigationPc />
            <NavigationMobile />
            <div className="grow md:px-5">{children}</div>
            <Footer />
            <Nav isOpen={navOpen} setIsOpen={setNavOpen} />
        </main>
    );
}