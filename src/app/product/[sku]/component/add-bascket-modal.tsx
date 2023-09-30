import BaseModal from "@/app/components/modal/base-modal";
import { useRouter } from "next/navigation";
import { ProductCardModal } from "@/app/components/product-card/product-card-modal-form";
import { popUpRemoveModalProps } from "@/app/cart/type";

export default function AddBascketModal(props: popUpRemoveModalProps) {
    const { openModal, setOpenModal, ...rest } = props;
    const router = useRouter();

    const title = "장바구니에 추가되었습니다.";
    const content = <ProductCardModal {...props} />;

    function closeModal() {
        setOpenModal(false);
    }

    function clickYes() {
        router.push("/cart");
        setOpenModal(false);
    }
    const modalButton = (
        <>
            <button type="button" className="black-bar-modal px-6 py-2" onClick={clickYes}>
                장바구니로 이동
            </button>
            <button
                type="button"
                className="bg-light-gray px-4 py-2 active:text-deep-gray active:bg-gray-200 rounded"
                onClick={closeModal}>
                쇼핑 계속하기
            </button>
        </>
    );

    return (
        <>
            <BaseModal
                title={title}
                content={content}
                closeModal={closeModal}
                isOpen={openModal}
                button={modalButton}
            />
        </>
    );
}
