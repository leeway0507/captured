import Image from "next/image";

type PropType = {
    src: string;
    brand: string;
    productName: string;
    href: string;
};

export const Thumbnail: React.FC<PropType> = ({ src, brand, productName, href }) => {
    if (href == undefined) {
        throw new Error("href is undefined");
    }

    return (
        <div className="bg-gray-100 flex flex-col w-full py-5 px-3">
            <div className="py-7"></div>
            <Image
                src={src}
                alt="test-img"
                sizes="100vw"
                style={{
                    margin: "0 auto",
                    width: "75%",
                    height: "auto",
                }}
                width={500}
                height={300}
            />
            <div className="flex flex-col px-8 tb:px-16">
                <div className="py-5"></div>
                <div className="text-xl tb:text-2xl">{brand}</div>
                <div className="text-lg tb:text-xl">{productName}</div>
                <div className="py-1"></div>
                <a href={href}>
                    <div className="flex justify-center text-2xl border-2 main-black-border w-full py-2 hover:bg-main-black hover:text-light-gray hover:border-blue-black">
                        Shop Now
                    </div>
                </a>
                <div className="py-1"></div>
            </div>
        </div>
    );
};
