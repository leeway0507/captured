import Image from "next/image";
import { cartProductCardProps } from "@/app/type";
import Link from "next/link";

export default function productCard({
    id,
    brand,
    productName,
    productId,
    size,
    quantity,
    price,
    intl,
}: cartProductCardProps) {
    const totalPrice = price * quantity;
    const productImgUrl = `/product/${brand}/${productName} ${productId}/main.png`;

    return (
        <div className="text-sub-black py-5 px-3 tb:px-5 text-base border-b border-deep-gray" key={id}>
            <div className="flex-center flex-col pt-2">
                <div className="flex mb-1 w-full">
                    <div className="flex-center flex-col max-w-[120px]">
                        <Image src={productImgUrl} width={200} height={200} alt={productId} />
                    </div>
                    <div className="grow">
                        <div className="flex flex-col ps-2 text-blue-black">
                            <div className="flex justify-between">
                                <Link
                                    href={`cat/${brand.replace(" ", "-")}`}
                                    className="text-sub-black text-base hover:text-blue-400">
                                    {brand.toUpperCase()}
                                </Link>
                            </div>
                            <Link
                                href={`product/${brand}/${productName} ${productId}`}
                                className="text-blue-black hover:text-blue-300">
                                {productName}
                                <div>{productId.toUpperCase()}</div>
                            </Link>
                            <div className="flex justify-between">
                                <div>{size}</div>
                                <div className="underline text-sm">{intl ? "해외배송" : "국내배송"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="text-sm flex-center max-w-[120px] grow">
                        <span> {`수량 : ${quantity}`}</span>
                    </div>
                    <div className="text-sub-black flex-right grow text-lg">₩ {totalPrice.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}
