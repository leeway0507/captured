import type { catProductCardProps } from "../type";
import Image from "next/image";

export default function ProductInfo(props: catProductCardProps) {
    return (
        <div className="flex flex-col text-blue-black tracking-tidest">
            <div className="flex-left justify-between text-sub-black">
                <div className="text-xl capitalize">{props.brand}</div>
            </div>
            <div className="flex-left justify-between">
                <div className="text-lg">{props.productName}</div>
                <div className="text-base text-sub-black">₩ {props.price.toLocaleString()}</div>
            </div>
            <div className="flex-left justify-between">
                <div className="text-sm">{props.productId.toUpperCase()}</div>
                <div className="text-xs mx-2">{props.intl && "관·부가세 포함"}</div>
            </div>
            <div className="flex-left justify-between"></div>
        </div>
    );
}
