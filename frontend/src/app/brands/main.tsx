import Image from "next/image";
import Link from "next/link";

export default async function Brands() {
    const brandsArray = JSON.parse(process.env.NEXT_PUBLIC_BRAND_ARRAY!);

    const brandsComponent = (brandName: string) => {
        const brandNameBar = brandName.replaceAll(" ", "-");
        return (
            <Link href={`category/brand/${brandNameBar}`} className="flex ps-2 link-animation ">
                <div className="flex-center w-[80px] h-auto tb:w-[120px] bg-main-black">
                    <div className="w-[85%] h-[85%] relative">
                        <Image
                            src={`/brands/white/${brandNameBar}-white-logo.png`}
                            alt="test-img"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>
                <div className="h-full bg-main-black triangle-left"></div>
                <div className="basis-2/3 flex-center grow text-xl-2xl capitalize ps-3 border-e-[16px] border-y-4 border-main-black">
                    {brandName}
                </div>
            </Link>
        );
    };

    return (
        <div className="flex flex-col justify-between w-full max-w-4xl mx-auto">
            <div className="flex-center flex-col py-4">
                <div className="flex-center w-full">
                    <div className="flex-center text-3xl tb:text-4xl tb:py-8 text-sub-black tracking-[.25em]">
                        BRANDS
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 tb:grid-cols-2 px-4 py-8 w-full flex-wrap gap-2">
                {brandsArray.map((brandName: string) => {
                    return brandsComponent(brandName);
                })}
            </div>
        </div>
    );
}
