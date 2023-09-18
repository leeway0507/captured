import Image from "next/image";
import Link from "next/link";

import type { catProductCardProps } from "../type";

export default function ProductCard({ id, brand, productName, productId, price, intl }: catProductCardProps) {
    const productImgUrl = "/product-img/" + `${brand} ${productName} ${productId}.png`;
    return (
        <Link href="." className="mondaL text-sub-black text-xs font-light pb-6" key={id}>
            <div className="flex flex-col">
                <div>
                    <Image src={productImgUrl} width={300} height={300} alt={productId} />
                </div>
                <div className="flex flex-col text-sub-black">
                    <div className="flex justify-between">
                        {/* <div className="uppercase text-sub-black">{brand}</div> */}
                    </div>
                    <div>{`${brand} ${productName} | ${productId.toUpperCase()}`}</div>
                    {/* <div className=" text-blue-black"> {productId.toUpperCase()} </div> */}
                    <div className="py-2 font-bold">
                        {" "}
                        <div className="inline-block font-bold">국내배송상품</div> | ₩ {price.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}
