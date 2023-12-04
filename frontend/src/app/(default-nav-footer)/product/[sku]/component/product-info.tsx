import type { productCardProps } from "@/app/type";

export default function ProductInfo(props: productCardProps) {
    return (
        <div className="flex flex-col text-main-black tracking-tidest text-base">
            <div className="flex-left gap-2">
                <div className="uppercase lg:text-xl font-bold">{props.brand}</div>
            </div>
            <div className="flex items-left justify-between lg:text-lg gap-4">
                <div>{props.productName}</div>
                <div className="whitespace-nowrap relative">
                    <div>₩ {props.price.toLocaleString()} </div>
                    <div className="text-xs lg:text-sm mx-2 text-center absolute pb-5 text-blue-black">
                        {props.intl && "관·부가세 포함"}
                    </div>
                </div>
            </div>
            <div className="flex-left justify-between gap-2">
                <div className="">{props.productId.toUpperCase()}</div>
            </div>
        </div>
    );
}
