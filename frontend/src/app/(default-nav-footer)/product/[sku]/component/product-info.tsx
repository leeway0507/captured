import type { productCardProps } from "@/app/type";

export default function ProductInfo(props: productCardProps) {
    return (
        <div className="flex flex-col text-main-black tracking-tidest text-base">
            <div className="flex-left">
                <div className="capitalize lg:text-xl font-bold">{props.brand}</div>
            </div>
            <div className="flex-left justify-between lg:text-lg">
                <div className="">{props.productName}</div>
                <div className=" ">₩ {props.price.toLocaleString()}</div>
            </div>
            <div className="flex-left justify-between ">
                <div className="">{props.productId.toUpperCase()}</div>
                <div className="text-xs lg:text-sm mx-2 text-center">{props.intl && "관·부가세 포함"}</div>
            </div>
        </div>
    );
}
