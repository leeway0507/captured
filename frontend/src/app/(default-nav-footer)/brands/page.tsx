import Link from "next/link";
import { getFilterMeta } from "../category/[...pageType]/component/fetch";
import { indexProps } from "../category/[...pageType]/type";

import Footer from "@/app/components/nav-footer/component/footer";
import { BottomNavBar } from "@/app/components/nav-footer/bottom-nav-bar";

export default async function Brands() {
    const data = await getFilterMeta();
    const index: indexProps = data.index;

    const brandsComponent = (brandName: string) => {
        const brandNameBar = brandName.replaceAll(" ", "-");
        return (
            <Link href={`category/brand/${brandNameBar}`} className="link-animation" key={brandName}>
                <div className="uppercase text-base">{brandName}</div>
            </Link>
        );
    };

    return (
        <div className="flex flex-col justify-between w-full mx-auto">
            <div className="flex-center text-3xl tb:text-4xl py-4 tb:py-8 text-sub-black tracking-[.15em]">BRAND</div>

            <div className="grid grid-cols-1 tb:grid-cols-4 py-4 tb:py-8 w-full gap-1 mx-auto max-w-4xl">
                {Object.entries(index).map(([alphabet, brandList]) => {
                    return (
                        <div key={alphabet} className="mx-auto w-[80%]">
                            <div className="flex flex-col pb-8">
                                <div className="text-2xl tb:text-3xl text-sub-black tracking-[.25em] border-b ps-1">
                                    {alphabet}
                                </div>
                                <div className="py-2 flex flex-col gap-1">
                                    {brandList.map((brandName: string) => {
                                        return brandsComponent(brandName);
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Footer />
            <BottomNavBar nav="brand" />
        </div>
    );
}
