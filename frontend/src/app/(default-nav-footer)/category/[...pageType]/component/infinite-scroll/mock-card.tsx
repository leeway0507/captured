import Link from "next/link";
import { productCardProps } from "@/app/type";

const ProductCardSkeleton = ({ sku }: { sku: number }) => (
    <div className="rounded-lg bg-light-gray aspect-square">
        <div className="w-full h-full flex-center text-5xl font-test text-rose-600/50">{sku}</div>
    </div>
);

export default function ProductCard({
    props,
    isIntl = true,
    idx = 3,
    prorityNumber = 3,
}: {
    props: productCardProps;
    isIntl?: boolean;
    idx?: number;
    prorityNumber?: number;
}) {
    const { sku, brand, productName, price, productId, intl } = props;

    const shotenProductName = productName.length > 40 ? productName.slice(0, 40) + "..." : productName;
    return (
        <Link href={`/product/${sku}`} className=" text-sub-black text-xs font-light pb-6 z-1 " key={sku}>
            <div className="flex flex-col">
                <div className="relative">
                    <ProductCardSkeleton sku={sku} />
                </div>
                <div className="flex flex-col text-sub-black">
                    <div className="h-[50px]">{`${brand} ${shotenProductName} | ${productId.toUpperCase()}`}</div>
                    <div className="py-2 font-bold">
                        {isIntl && <div className="inline-block font-bold">{intl ? "해외배송" : "국내배송"} | </div>} ₩{" "}
                        {price.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}
