"use client";
import CartProductCardArr from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { cartProductCardProps } from "../../type";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import CartEmptyGuide from "./component/cart-empty-guide";
import Link from "next/link";
import useSizeDetect from "@/app/components/hook/use-size-detect-hook";
import { IntlShipment } from "../../components/notification/shipment-info";
import { BottomNavBar } from "@/app/components/nav-footer/component/bottom-nav-bar";

export default function MainMobile({ arr }: { arr: cartProductCardProps[] }) {
    const { cartQuantity } = useShoppingCart();
    const { innerHeight, maxHeight } = useSizeDetect();
    const intlIncluded = arr.some((item) => item.intl === true);

    if (cartQuantity === undefined) return null;
    return cartQuantity === 0 ? (
        <div className="tb:hidden">
            <CartEmptyGuide fontSize="xl" />
        </div>
    ) : (
        <>
            <div className="tb:hidden flex flex-col grow pb-[280px]">
                <div className="mx-2 h-full flex flex-col grow">
                    <CartProductCardArr arr={arr} />
                </div>
                <div className="rounded-xl">
                    {intlIncluded && (
                        <IntlShipment
                            title="해외 구매대행 상품 안내"
                            content="구매상품 중 해외배송 상품이 포함되어 있습니다.
                            상품 구입을 위해 개인통관부호가 필요하며 5 - 15일의 배송기간이 소요 됩니다."
                        />
                    )}
                </div>
            </div>
            <div
                className={`${
                    maxHeight > 0 && maxHeight == innerHeight && "pb-[20px]"
                } h-[250px] fixed bottom-0 w-full bg-gray-50 px-4 pt-6 border-t shadow-inner tb:hidden`}>
                <ProductCheckOut arr={arr} />

                <Link href="/order" className="black-bar-xl m-3 tracking-[0.2em]">
                    주문하기
                </Link>
            </div>
        </>
    );
}
