import Image from "next/image";
import Link from "next/link";
import { productCardProps } from "@/app/type";

export default function ProductCard(props: productCardProps) {
    const { id, brand, productName, price, productId } = props;

    const productImgUrl = `/product/${brand}/${productName} ${productId}/main.png`;
    return (
        <Link href={`/product/${id}`} className="mondaL text-sub-black text-xs font-light pb-6" key={id}>
            <div className="flex flex-col">
                <div>
                    <Image src={productImgUrl} width={1000} height={1000} alt={productId} className="rounded-md" />
                </div>
                <div className="flex flex-col text-sub-black">
                    <div className="flex justify-between">
                        {/* <div className="uppercase text-sub-black">{brand}</div> */}
                    </div>
                    <div>{`${brand} ${productName} | ${productId.toUpperCase()}`}</div>
                    <div className="py-2 font-bold">
                        {" "}
                        <div className="inline-block font-bold">국내배송</div> | ₩ {price.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}
