"use client";
import CartProductCardArr from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { cartProductCardProps } from "../../type";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import CartEmptyGuide from "./component/cart-empty-guide";
import Link from "next/link";
import { IntlShipment } from "../../components/notification/shipment-info";

export default function MainPC({ arr }: { arr: cartProductCardProps[] }) {
    const { cartQuantity } = useShoppingCart();
    const intlIncluded = arr.some((item) => item.intl === true);
    return cartQuantity === 0 ? (
        <div className="hidden tb:block">
            <CartEmptyGuide fontSize="3xl" />
        </div>
    ) : (
        <div className="flex-col max-w-5xl w-full pt-12 mx-auto">
            <div className="flex relative mb-10 h-full gap-8 justify-evenly">
                <div className="basis-[60%] overflow-auto">
                    <div className="me-4">
                        <CartProductCardArr arr={arr} />
                    </div>
                </div>
                <div className="basis-[40%] max-w-[380px]">
                    <div className="sticky top-[80px]">
                        <ProductCheckOut arr={arr} />
                        <Link href="/order" className="black-bar-xl m-3 tracking-[0.2em]">
                            주문하기
                        </Link>
                        <div className="py-4">
                            {intlIncluded && (
                                <IntlShipment
                                    title="해외 구매대행 상품 안내"
                                    content="구매상품 중 해외배송 상품이 포함되어 있습니다.
                                    상품 구입을 위해 개인통관부호가 필요하며 5 - 15일의 배송기간이 소요 됩니다."
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
