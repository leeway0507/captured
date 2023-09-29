import Image from "next/image";

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
        <div className="bg-gray-50 flex-center flex-col">
            <div className="square max-w-[75%] tb:max-w-[50%] mb-4">
                <div className="inner flex-right flex-col">
                    <Image src={src} alt={productName} className="mb-4" width={1000} height={1000} />
                    <div className="w-full">
                        <div className="flex-left text-lg ">{brand}</div>
                        <div className="flex-left text-xl mb-2">{productName}</div>
                        <a href={href}>
                            <div className="flex-center text-xl rounded border-2 main-black-border shadow-lg py-2 hover:bg-main-black hover:text-light-gray hover:border-blue-black hover:shadow-2xl">
                                Shop Now
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
