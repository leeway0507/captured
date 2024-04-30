import Link from "next/link";
import { indexProps } from "../category/[...pageType]/type";
import { getFilterMetaProxy } from "../category/[...pageType]/component/fetch";
import Footer from "@/app/components/nav-footer/component/footer";
import { BottomNavBar } from "@/app/components/nav-footer/component/bottom-nav-bar";

export default async function Brands() {
    const index: indexProps = await getFilterMetaProxy().then((data) => {
        return data.index;
    });

    const brandsComponent = (brandName: string) => {
        return (
            <Link href={`category/brand/${brandName}`} className="link-animation" key={brandName}>
                <div className="uppercase text-base">{brandName}</div>
            </Link>
        );
    };

    return (
        <>
            <div className="flex-center text-3xl tb:text-4xl py-4 tb:py-8 text-sub-black tracking-[.15em]">BRAND</div>
            <div className="grid grid-cols-1 tb:grid-cols-4 py-4 tb:py-8 w-full gap-1 mx-auto max-w-5xl">
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
        </>
    );
}
