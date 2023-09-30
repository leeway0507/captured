import Image from "next/image";
import { popUpRemoveModalProps } from "../type";
import YesNoModal from "@/app/components/modal/yes-no-modal";
import { useShoppingCart } from "@/app/shopping-cart-context";
import { ProductCardModal } from "@/app/components/product-card/product-card-modal-form";

export default function PopUpRemoveModal(props: popUpRemoveModalProps) {
    const { sku, size, ...rest } = props;

    const title = "아래와 일치하는 상품을 제거합니다.";
    const { removeFromCart } = useShoppingCart();

    const toggleName = <Image src="/icons/delete.svg" width={24} height={24} alt="delete" />;

    return (
        <YesNoModal
            toggleName={toggleName}
            content={ProductCardModal(props)}
            title={title}
            trueCallback={() => {
                removeFromCart(sku, size);
            }}
        />
    );
}
