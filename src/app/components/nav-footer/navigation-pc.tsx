import { useShoppingCart } from "../../shopping-cart-context";
import Image from "next/image";
import Link from "next/link";
import UserDropDown from "./user-dropdown";
import CartBtn from "./component/cart-btn";

export default function NavigationPc() {
    const { setSearch, search, setNavOpen } = useShoppingCart();

    const closeNavToggle = () => {
        setNavOpen(false);
    };

    return (
        <>
            <header
                className="border-x-none h-[200px] px-10 pb-5 sticky top-0 flex flex-col justify-between border-b border-light-gray z-50 bg-white  "
                style={{ boxShadow: "0px 2px 0px var(--deep-gray)" }}>
                <div className="flex w-full py-5">
                    <div className="flex-left basis-3/12" onClick={closeNavToggle}>
                        <input
                            type="text"
                            className="text-xs-sm mt-0 block w-full px-0.5 border-0 border-b border-gray-200 focus:ring-0 focus:border-sub-black"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            placeholder="검색"
                            value={search}
                        />
                    </div>
                    <div className="flex-center basis-6/12">
                        <Link href="/" className="w-[200px] h-[100px] relative">
                            <Image src="/icons/main-logo.svg" alt="main logo" fill />
                        </Link>
                    </div>
                    <div className="flex-right basis-3/12">
                        <UserDropDown />
                        <CartBtn />
                    </div>
                </div>
                <div className="flex justify-between text-sm-base">
                    <Link href="/category/latest" className="py-2 grow rounded-md flex-center active:bg-light-gray">
                        <div className="mx-2">LATEST</div>
                    </Link>
                    <Link href="/brands" className="py-2 grow rounded-md flex-center active:bg-light-gray">
                        <div className="mx-2">BRANDS</div>
                    </Link>
                    <Link href="/category/shoes" className="py-2 grow rounded-md flex-center active:bg-light-gray">
                        <div className="mx-2">SHOES</div>
                    </Link>
                    <Link href="/category/clothing" className="py-2 grow rounded-md flex-center active:bg-light-gray">
                        <div className="mx-2">CLOTHING</div>
                    </Link>
                    <Link href="/category/accessory" className="py-2 grow rounded-md flex-center active:bg-light-gray">
                        <div className="mx-2">ACCESSORY</div>
                    </Link>
                </div>
            </header>
        </>
    );
}
