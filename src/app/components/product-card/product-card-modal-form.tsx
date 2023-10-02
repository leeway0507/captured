import Image from "next/image";
import { cartProductCardProps } from "@/app/type";

export const ProductCardModal = (props: cartProductCardProps) => {
    const { brand, productName, productId, size, intl, ...rest } = props;
    const productImgUrl = `/product/${brand}/${productName} ${productId}/thumbnail.png`;
    return (
        <div className="flex flex-col py-2">
            <div className="flex text-xs">
                <div className="flex-center flex-col basis-1/3">
                    <Image src={productImgUrl} width={150} height={150} alt={productId} />
                </div>
                <div className="basis-2/3">
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
