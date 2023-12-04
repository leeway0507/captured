"use client";
import CartProductCardArr from "./component/cart-product-array";
import ProductCheckOut from "./component/product-check-out";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import CartEmptyGuide from "./component/cart-empty-guide";
import { IntlShipment } from "../../components/notification/shipment-info";
import CartOrderButton from "./component/cart-order-button";

export default function MainMobile() {
    const { cartQuantity, changeAllSelectedItems, changeNotAllSelectedItems, cartItems } = useShoppingCart();

    const intlIncluded = cartItems?.some((item) => item.intl === true);
    const checkOutItems = cartItems?.filter((item) => item.selected === true);

    if (cartItems === undefined) return null;

    return cartQuantity === 0 ? (
        <div className="tb:hidden">
            <CartEmptyGuide fontSize="xl" />
        </div>
    ) : (
        <>
            <div className="tb:hidden flex flex-col grow pb-[280px]">
                <div className="pt-6 ps-2 flex gap-4 w-full border-b pb-2 text-sm">
                    <button className="link-animation" onClick={changeAllSelectedItems}>
                        전체 선택
                    </button>
                    <button className="link-animation" onClick={changeNotAllSelectedItems}>
                        선택 해제
                    </button>
                </div>
                <div className="mx-2 h-full flex flex-col grow">
                    <CartProductCardArr arr={cartItems} />
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
                className={`h-[230px] fixed bottom-0 w-full bg-gray-50 px-4 my-2 py-2 border-t shadow-inner tb:hidden z-10`}>
                <ProductCheckOut arr={checkOutItems!} />
                <CartOrderButton />
            </div>
        </>
    );
}
