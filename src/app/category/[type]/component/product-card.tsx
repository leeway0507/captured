import Image from "next/image";
import Link from "next/link";
import { productCardProps } from "@/app/type";

export default function ProductCard(props: productCardProps) {
    const { sku, brand, productName, price, productId, intl } = props;

    const productImgUrl = `/product/${brand}/${productName} ${productId}/thumbnail.png`;
    return (
        <Link href={`/product/${sku}`} className="mondaL text-sub-black text-xs font-light pb-6 " key={sku}>
            <div className="flex flex-col">
                <div className="max-w-[300px] max-h-[300px] relative">
                    <Image src={productImgUrl} alt={productId} className="rounded-md" width={1000} height={1000} />
                </div>
                <div className="flex flex-col text-sub-black">
                    <div className="flex justify-between">
                        {/* <div className="uppercase text-sub-black">{brand}</div> */}
                    </div>
                    <div>{`${brand} ${productName} | ${productId.toUpperCase()}`}</div>
                    <div className="py-2 font-bold">
                        <div className="inline-block font-bold">{intl ? "해외배송" : "국내배송"}</div> | ₩{" "}
                        {price.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}
