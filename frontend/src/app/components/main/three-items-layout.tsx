import Link from "next/link";
import Image from "next/image";

export default async function ThreeItemsLayOut() {
    return (
        <div className="mx-auto tb:max-w-[1660px] h-full w-full flex flex-col gap-2  tb:grid tb:grid-cols-3 tb:px-4 px-1">
            <Link
                href="/category/clothing"
                className="relative aspect-[5/3] tb:aspect-[4/5] w-full col-span-1 hover:opacity-90 ">
                <div className="absolute w-full h-full text-white z-50 flex-col flex-center gap-2">
                    <div className="text-2xl font-bold">Clothing</div>
                    <div className="text-base underline underline-offset-3">SHOP NOW</div>
                </div>
                <div className="absolute w-full h-full bg-black z-10 opacity-50 " />
                <Image
                    src={`/layout/clothing.jpg`}
                    alt="clothing"
                    priority
                    sizes="1200px"
                    quality={95}
                    className="object-cover rounded-sm"
                    fill
                />
            </Link>
            <Link
                href="/category/shoes"
                className="relative aspect-[5/3] tb:aspect-[4/5] w-full col-span-1 hover:opacity-90 ">
                <div className="absolute w-full h-full text-white z-50 flex-col flex-center gap-2">
                    <div className="text-2xl font-bold">Shoes</div>
                    <div className="text-base underline underline-offset-3">SHOP NOW</div>
                </div>
                <div className="absolute w-full h-full bg-black z-10 opacity-50 " />
                <Image
                    src={`/layout/shoes.avif`}
                    alt="shoes"
                    sizes="1200px"
                    quality={95}
                    className="object-cover rounded-sm"
                    fill
                    priority
                />
            </Link>
            <Link
                href="/category/accessory"
                className="relative aspect-[5/3] tb:aspect-[4/5] w-full col-span-1 hover:opacity-90 ">
                <div className="absolute w-full h-full  text-white z-50 flex-col flex-center gap-1">
                    <div className="text-2xl font-bold">Accessory</div>
                    <div className="text-base underline underline-offset-3">SHOP NOW</div>
                </div>
                <div className="absolute w-full h-full bg-black z-10 opacity-50 " />
                <Image
                    src={`/layout/accessory.jpg`}
                    alt="accessory"
                    sizes="1200px"
                    quality={95}
                    className="object-cover rounded-sm"
                    fill
                    priority
                />
            </Link>
        </div>
    );
}
