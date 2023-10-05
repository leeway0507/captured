import NavMobile from "./nav-mobile";
import NavPc from "./nav-pc";
import NavMobileSideBar from "./nav-mobile-sidebar";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import PageLoading from "@/app/components/loading/page-loading";
import { useSession } from "next-auth/react";

export default function NavMain() {
    const { navOpen, setNavOpen, isMobile } = useShoppingCart();
    const { data: session } = useSession();
    console.log("session", session?.user);

    if (isMobile === undefined) {
        return <PageLoading />;
    }

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
