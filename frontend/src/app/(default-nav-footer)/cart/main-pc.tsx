"use client";
import CartProductCardArr from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import CartEmptyGuide from "./component/cart-empty-guide";
import { IntlShipment } from "../../components/notification/shipment-info";
import CartOrderButton from "./component/cart-order-button";
import PageLoading from "@/app/components/loading/page-loading";

export default function MainPC() {
    const { cartQuantity, changeAllSelectedItems, changeNotAllSelectedItems, cartItems } = useShoppingCart();

    const intlIncluded = cartItems?.some((item) => item.intl === true);
    const checkOutItems = cartItems?.filter((item) => item.selected === true);

    if (cartItems === undefined) return <PageLoading />;

    return cartQuantity === 0 ? (
        <div className="hidden tb:block">
            <CartEmptyGuide fontSize="3xl" />
        </div>
    ) : (
        <div className="max-w-5xl w-full pt-12 mx-auto">
            <div className="flex relative mb-10 gap-8 justify-evenly">
                <div className="basis-[60%] overflow-auto">
                    <div className="me-4">
                        <div className="flex gap-4 w-full border-b pb-2 text-sm">
                            <button className="link-animation" onClick={changeAllSelectedItems}>
                                전체 선택
                            </button>
                            <button className="link-animation" onClick={changeNotAllSelectedItems}>
                                선택 해제
                            </button>
                        </div>
                        <CartProductCardArr arr={cartItems} />
                    </div>
                </div>
                <div className="basis-[40%] max-w-[380px]">
                    <div className="sticky top-[80px]">
                        <ProductCheckOut arr={checkOutItems!} />
                        <CartOrderButton />
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
