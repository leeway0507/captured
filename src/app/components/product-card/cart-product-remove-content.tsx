import Image from "next/image";
import { cartProductCardProps } from "@/app/type";

export interface popUpRemoveModalProps extends cartProductCardProps {
    productImgUrl: string;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardContent = (props: popUpRemoveModalProps) => {
    const { brand, productImgUrl, productName, productId, size, intl, ...rest } = props;
    return (
        <div className="flex flex-col py-2">
            <div className="flex text-sm">
                <div className="flex-center flex-col basis-2/6">
                    <Image src={productImgUrl} width={200} height={200} alt={productId} />
                </div>
                <div className="basis-4/6">
                    <div className="flex flex-col ps-2 my-2 text-blue-black w-full ">
                        <div className="uppercase text-sub-black me-auto">{brand}</div>
                        <div className="me-auto">{productName}</div>
                        <div className="uppercase me-auto">{productId}</div>
                        <div className="underline ">{intl ? "해외배송" : "국내배송"}</div>
                        <div className="me-auto">{size}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
