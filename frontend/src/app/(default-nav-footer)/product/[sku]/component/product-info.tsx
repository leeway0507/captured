import type { productCardProps } from "@/app/type";
import Link from "next/link";

export default function ProductInfo(props: productCardProps) {
    return (
        <div className="flex flex-col text-main-black tracking-tidest gap-1">
            <Link href={`/category/brand/${props.brand}`} className="uppercase lg:text-sm text-zinc-400 underline">
                {props.brand}
            </Link>

            <div className="flex items-left justify-between lg:text-xl capitalize font-bold">
                <div>{props.productName}</div>
            </div>
            <div className="flex-left justify-between gap-2 text ">{props.productId.toUpperCase()}</div>

            <div className="whitespace-nowrap relative pt-3 pb-6 text-base">
                <div>₩ {props.price.toLocaleString()} </div>
                <div className="text-xs mx-2 text-blue-black">{props.intl && "관·부가세 포함"}</div>
            </div>
            <hr />
        </div>
    );
}
