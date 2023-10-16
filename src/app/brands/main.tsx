import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
export default async function Brands() {
    const session = await getServerSession(options);

    const brandsArray = JSON.parse(process.env.BRAND_ARRAY as string);

    const brandsComponent = (brandName: string) => {
        const brandNameBar = brandName.replace(" ", "-");
        return (
            <Link href={`category/brand/${brandNameBar}`} className="flex ps-2 link-animation ">
                <div className="flex-right relative ">
                    <Image
                        src={`/brands/${brandNameBar}-white-logo.png`}
                        alt="test-img"
                        width={100}
                        height={100}
                        className="w-[80px] tb:w-[120px] bg-main-black"
                    />

                    <div className="grow h-full bg-main-black triangle-left"></div>
                </div>
                <div className="basis-3/5 flex-center grow text-2xl-3xl capitalize ps-3 border-e-[16px] border-y-4 border-main-black">
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
            <div className="grid grid-cols-1 tb:grid-cols-2 px-4 py-8 w-full flex-wrap gap-4">
                {brandsArray.map((brandName: string) => {
                    return brandsComponent(brandName);
                })}
            </div>
        </div>
    );
}
