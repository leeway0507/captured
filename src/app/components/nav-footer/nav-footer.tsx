import NavigationMobile from "./navigation-mobile";
import NavigationPc from "./navigation-pc";
import Footer from "./footer";
import Nav from "./NavMobile";
import { useShoppingCart } from "../../shopping-cart-context";
import PageLoading from "../loading/page-loading";

interface NavFooterProps {
    children: React.ReactNode;
}

export default function NavFooter({ children }: NavFooterProps) {
    const { navOpen, setNavOpen, isMobile } = useShoppingCart();

    if (isMobile === undefined) {
        return <PageLoading />;
    }

    return (
        <main className="custom-container">
            {isMobile ? (
                <>
                    <NavigationMobile />
                    <Nav isOpen={navOpen} setIsOpen={setNavOpen} />
                </>
            ) : (
                <NavigationPc />
            )}
            <div className="grow">{children}</div>
            <Footer />
        </main>
    );
}
