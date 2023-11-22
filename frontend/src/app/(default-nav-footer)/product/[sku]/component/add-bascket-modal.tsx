import { PopUpModal } from "@/app/components/modal/new-modal";
import { useRouter } from "next/navigation";
import { ProductCardModal } from "@/app/components/product-card/product-card-modal-form";
import { cartProductCardProps } from "@/app/type";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";

export default function AddBascketModal(data: cartProductCardProps) {
    const router = useRouter();
    const { setModalOpen } = useShoppingCart();

    function closeModal() {
        setModalOpen(false);
    }

    function clickYes() {
        router.push("/cart");
        setModalOpen(false);
    }
    const modalButton = (
        <>
            <button type="button" className="black-bar-modal px-4 py-2" onClick={clickYes}>
                장바구니로 이동
            </button>
            <button
                type="button"
                className="bg-light-gray px-4 py-2 active:text-deep-gray active:bg-gray-200 rounded text-sm"
                onClick={closeModal}>
                쇼핑 계속하기
            </button>
        </>
    );

    return PopUpModal(modalButton);
}
