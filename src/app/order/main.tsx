import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { cartProductCardProps } from "../type";
import Link from "next/link";
import Image from "next/image";
import PageLoading from "../components/loading/page-loading";

export default function Main() {
    const { mockDB, cartItems, isMobile } = useShoppingCart();

    const CartItemArr = cartItems
        ?.map((item) => {
            const product = mockDB.find((product) => product.sku === item.id);
            if (product) return { ...product, size: item.size, quantity: item.quantity };
        })
        .filter((item): item is cartProductCardProps => Boolean(item));

    if (!CartItemArr) return <PageLoading />;

    return (
        <>
            <div className="sticky top-0 w-full m-auto text-3xl flex-center bg-white z-50 py-4">
                <Link href="/" className="w-[150px] h-[80px] tb:w-[200px] tb:h-[100px] relative ">
                    <Image src="/icons/main-logo.svg" alt="main logo" fill />
                </Link>
            </div>
            {isMobile ? (
                <div className="px-5">
                    <MainMobile arr={CartItemArr} />
                </div>
            ) : (
                <div className="px-5">
                    <MainPc arr={CartItemArr} />
                </div>
            )}
        </>
    );
}
