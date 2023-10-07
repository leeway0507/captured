"use client";
import CartProductCardArr from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { cartProductCardProps } from "../type";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import CartEmptyGuide from "./component/cart-empty-guide";
import Link from "next/link";
import { IntlShipment } from "../components/notification/shipment-info";

export default function MainPC({ arr }: { arr: cartProductCardProps[] }) {
    const { cartQuantity } = useShoppingCart();
    return cartQuantity === 0 ? (
        <CartEmptyGuide fontSize="3xl" />
    ) : (
        <div className="flex-col w-full pt-8">
            <div className="flex relative mb-10 h-full gap-8">
                <div className="basis-[60%] overflow-auto">
                    <div className="me-4">
                        <CartProductCardArr arr={arr} />
                    </div>
                </div>
                {/* <div className="border-e border-gray-200"></div> */}
                <div className="basis-[40%] relative ">
                    <div className="sticky top-5">
                        <ProductCheckOut arr={arr} />
                        <Link href="/order" className="black-bar-xl m-3 tracking-[0.2em]">
                            주문하기
                        </Link>
                        <div className="py-4">
                            <IntlShipment
                                title="해외 구매대행 상품 안내"
                                content="선택하신 상품 중 해외 구매대행 상품이 포함되어 있습니다.
                            상품 구입을 위해 개인통관부호가 필요하며 5 ~ 15일의 배송기간이 소요 됩니다."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
