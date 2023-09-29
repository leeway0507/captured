import { cartProductCardProps } from "@/app/type";

export interface popUpRemoveModalProps extends cartProductCardProps {
    productImgUrl: string;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
