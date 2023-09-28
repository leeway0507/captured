import Image from "next/image";
import { productCardProps } from "@/app/type";
import YesNoModalWithoutBtn from "@/app/components/modal/yes-no-without-btn-modal";
import { useShoppingCart } from "@/app/shopping-cart-context";

interface popUpRemoveModalProps extends productCardProps {
    productImgUrl: string;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUpRemoveModal(props: popUpRemoveModalProps) {
    const { id, brand, productImgUrl, productName, productId, size, intl, openModal, setOpenModal, ...rest } = props;
    const title = "아래와 일치하는 상품을 제거합니다.";
    const toggleName = <Image src="/icons/delete.svg" width={28} height={28} alt="delete" />;
    const { removeFromCart } = useShoppingCart();

    const content = (
        <div className="flex flex-col py-2">
            <div className="flex text-sm">
                <div className="flex-center flex-col basis-2/6">
                    <Image src={productImgUrl} width={200} height={200} alt={productId} />
                </div>
                <div className="basis-4/6">
                    <div className="flex flex-col ps-2 my-2 text-blue-black w-full ">
                        <div className="uppercase text-sub-black me-auto">{brand}</div>
                        <div className="text-blue-black me-auto">{productName}</div>
                        <div className="uppercase me-auto">{productId}</div>
                        <div className="flex justify-between ">
                            <div>{size}</div>
                            <div className="underline ">{intl ? "해외배송" : "국내배송"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <YesNoModalWithoutBtn
            isOpen={openModal}
            setIsOpen={setOpenModal}
            content={content}
            title={title}
            trueCallback={() => {
                removeFromCart(id);
            }}
        />
    );
}
