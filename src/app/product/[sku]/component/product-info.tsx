import type { productCardProps } from "@/app/type";

export default function ProductInfo(props: productCardProps) {
    return (
        <div className="flex flex-col text-blue-black tracking-tidest text-sm lg:text-base">
            <div className="flex-left justify-between text-sub-black">
                <div className="capitalize text-base lg:text-xl">{props.brand}</div>
            </div>
            <div className="flex-left justify-between text-base lg:text-lg">
                <div className="">{props.productName}</div>
                <div className="text-sub-black ">₩ {props.price.toLocaleString()}</div>
            </div>
            <div className="flex-left justify-between">
                <div className="">{props.productId.toUpperCase()}</div>
                <div className="text-xs lg:text-sm mx-2">{props.intl && "관·부가세 포함"}</div>
            </div>
            <div className="flex-left justify-between"></div>
        </div>
    );
}
