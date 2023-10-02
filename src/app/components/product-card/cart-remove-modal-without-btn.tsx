import { cartProductCardProps } from "@/app/type";
import YesNoModalWithoutBtn from "@/app/components/modal/yes-no-modal-without-btn";
import { useShoppingCart } from "@/app/shopping-cart-context";
import { ProductCardModal } from "./product-card-modal-form";

export interface popUpRemoveModalProps extends cartProductCardProps {
    productImgUrl: string;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUpRemoveModal(props: popUpRemoveModalProps) {
    const { sku, size, openModal, setOpenModal, ...rest } = props;
    const title = "아래와 일치하는 상품을 제거합니다.";
    const { removeFromCart } = useShoppingCart();

    return (
        <YesNoModalWithoutBtn
            isOpen={openModal}
            setIsOpen={setOpenModal}
            content={ProductCardModal(props)}
            title={title}
            trueCallback={() => {
                removeFromCart(sku, size);
            }}
        />
    );
}
