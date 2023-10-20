import Image from "next/image";
import Link from "next/link";

type PropType = {
    src: string;
    brand: string;
    productName: string;
    href: string;
};

export default function Thumbnail({ src, brand, productName, href }: PropType) {
    if (href == undefined) {
        throw new Error("href is undefined");
    }

    return (
        <div className="bg-gray-50 flex-center flex-col relative">
            <div className="square max-w-[75%] tb:max-w-[40%] mb-4">
                <Link href={href} className="inner flex-right flex-col hover:opacity-60">
                    <Image src={src} alt={productName} className="mb-4" width={1000} height={1000} />
                </Link>
                <div className="absolute bottom-0 w-full capitalize">
                    <div className="flex-left text-sm tb:text-lg">{brand}</div>
                    <div className="flex-left text-sm tb:text-xl mb-2">{productName}</div>
                    <Link href={href}>
                        <div className="flex-center tb:text-xl text-base rounded border-2 main-black-border shadow-lg py-2 hover:bg-main-black hover:text-light-gray hover:border-blue-black hover:shadow-2xl">
                            Shop Now
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
