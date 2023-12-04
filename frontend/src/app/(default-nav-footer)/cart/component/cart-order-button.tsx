"use client";
import Link from "next/link";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { useRouter } from "next/navigation";

const CartOrderButton = () => {
    const { cartItems } = useShoppingCart();
    const router = useRouter();

    const selectHandler = () => {
        const checkOutItems = cartItems?.filter((item) => item.selected === true);

        if (checkOutItems?.length === 0) return alert("선택된 상품이 없습니다.");
        else {
            router.push("/order");
        }
    };

    if (cartItems === undefined) return null;
    return (
        <div className="w-full flex gap-4 justify-between">
            <Link href="/order?order=All" className="grow black-bar-xl my-3 tracking-[0.2em]">
                전체 주문
            </Link>
            <button
                onClick={selectHandler}
                className="grow black-bar-xl bg-white border-blue-black border text-main-black my-3 tracking-[0.2em]">
                선택 주문
            </button>
        </div>
    );
};

export default CartOrderButton;
