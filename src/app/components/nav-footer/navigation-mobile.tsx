"use client";
import { useShoppingCart } from "../../shopping-cart-context";
import Image from "next/image";
import Link from "next/link";

export default function NavigationMobile() {
    const { navOpen, setNavOpen } = useShoppingCart();
    const navOpenToggle = () => {
        setNavOpen(!navOpen);
    };

    const { cartQuantity } = useShoppingCart();

    return (
        <>
            <header className="tb:hidden sticky bg-white h-[10%] left-0 top-0 flex flex-row p-4 justify-between shadow-sm shadow-gray-200 z-50 w-100">
                <div className="flex-left basis-2/12">
                    {navOpen ? (
                        <Image src="/icons/close.svg" alt="close" width={24} height={24} />
                    ) : (
                        <div className="w-full h-full flex-left" onClick={navOpenToggle}>
                            <Image src="/icons/list.svg" alt="list" width={40} height={40} />
                        </div>
                    )}
                </div>

                <div className="flex justify-center basis-8/12">
                    <Link href="/">
                        <Image src="/icons/main-logo.svg" alt="main logo" width={160} height={36} />
                    </Link>
                </div>
                <div className="flex-right basis-2/12">
                    <Link href="/cart" className="w-full h-full flex-right">
                        <Image
                            src="/icons/shopping-cart.svg"
                            alt="shopping cart"
                            className="flex-right"
                            width={24}
                            height={24}
                        />
                        <div className="text-sm ps-1">{cartQuantity}</div>
                    </Link>
                </div>
            </header>
        </>
    );
}
