import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { cartProductCardProps } from "../type";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import PageLoading from "@/app/components/loading/page-loading";
import SigninAlertModal from "@/app/components/modal/signin-alert-modal-without-btn";
import { useEffect, useState } from "react";

export default function Main() {
    const { data: session, status } = useSession();
    const [data, setData] = useState<cartProductCardProps[] | undefined>(undefined);

    const { isMobile, cartItems } = useShoppingCart();

    useEffect(() => {
        const CartItemArr = cartItems
            ?.map((item) => {
                const product = localStorage.getItem(item.sku.toString());
                if (product) return { ...JSON.parse(product), size: item.size, quantity: item.quantity };
            })
            .filter((item): item is cartProductCardProps => Boolean(item));
        setData(CartItemArr);
    }, [cartItems]);

    if (status === "unauthenticated") {
        return <SigninAlertModal />;
    }

    if (data === undefined) return <PageLoading />;

    return (
        <>
            {isMobile ? (
                <>
                    <div className="sticky top-0 h-[100px] w-full m-auto px-4 z-50 bg-white">
                        <div className="flex h-full">
                            <div className="flex-center basis-1/4"></div>
                            <div className="flex-center basis-1/2">
                                <Link href="/">
                                    <Image src="/icons/main-logo.svg" alt="main logo" width={160} height={36} />
                                </Link>
                            </div>
                            <div className="flex-center basis-1/4"></div>
                        </div>
                    </div>
                    <div className="px-5">
                        <MainMobile arr={data} />
                    </div>
                </>
            ) : (
                <>
                    <div className="sticky top-0 h-[130px] w-full m-auto px-4 z-50 bg-white border-b">
                        <div className="flex h-full">
                            <div className="flex-center basis-1/4"></div>
                            <div className="flex-center basis-1/2">
                                <Link href="/">
                                    <Image src="/icons/main-logo.svg" alt="main logo" width={200} height={36} />
                                </Link>
                            </div>
                            <div className="flex-center basis-1/4"></div>
                        </div>
                    </div>
                    <div className="px-5">
                        <MainPc arr={data} />
                    </div>
                </>
            )}
        </>
    );
}
