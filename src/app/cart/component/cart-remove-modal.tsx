import Image from "next/image";
import { popUpRemoveModalProps } from "../type";
import YesNoModal from "@/app/components/modal/yes-no-modal";
import { useShoppingCart } from "@/app/shopping-cart-context";
import { CardContent } from "./cart-product-remove-content";

export default function PopUpRemoveModal(props: popUpRemoveModalProps) {
    const { id, size, ...rest } = props;

    const title = "아래와 일치하는 상품을 제거합니다.";
    const { removeFromCart } = useShoppingCart();

    const toggleName = <Image src="/icons/delete.svg" width={28} height={28} alt="delete" />;

    return (
        <YesNoModal
            toggleName={toggleName}
            content={CardContent(props)}
            title={title}
            trueCallback={() => {
                removeFromCart(id, size);
            }}
        />
    );
}
