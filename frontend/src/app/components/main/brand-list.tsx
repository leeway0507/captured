import Image from "next/image";
import Link from "next/link";
import { getFilterMeta } from "@/app/(default-nav-footer)/category/[...pageType]/component/fetch";

const evenLogoCard = (brandName: string, idx: number) => {
    const brandNameBar = brandName.replaceAll(" ", "-").toLowerCase();
    return (
        <Link
            key={idx}
            href={`/category/brand/${brandName}`}
            className="relative brand-box-black bg-main-black aspect-square
        ">
            <Image
                src={`/brands/white/${brandNameBar}-white-logo.png`}
                alt={`${brandNameBar}-logo`}
                fill
                sizes="(min-width: 1560px) 150px, (min-width: 1280px) calc(6.92vw + 43px), (min-width: 780px) calc(14.38vw - 10px), calc(20vw - 4px)"
                priority={true}
                className="scale-[85%]"
            />
        </Link>
    );
};
const oddLogoCard = (brandName: string, idx: number) => {
    const brandNameBar = brandName.replaceAll(" ", "-").toLowerCase();
    return (
        <Link key={idx} href={`/category/brand/${brandName}`} className="relative brand-box aspect-square">
            <Image
                src={`/brands/black/${brandNameBar}-logo.png`}
                alt={`${brandNameBar}-logo`}
                fill
                sizes="(min-width: 1560px) 150px, (min-width: 1280px) calc(6.92vw + 43px), (min-width: 780px) calc(14.38vw - 10px), calc(20vw - 4px)"
                priority={true}
                className="scale-[85%]"
            />
        </Link>
    );
};

const LogoBox = ({ logoArr }: { logoArr: string[] }) => {
    return logoArr.map((brandName: string, idx: number) => {
        if (idx % 2 === 0) {
            return evenLogoCard(brandName, idx);
        } else {
            return oddLogoCard(brandName, idx);
        }
    });
};

export default async function BrandList() {
    // const data = await getFilterMeta();
    // const logoArr = data.brand;
    const data = process.env.NEXT_PUBLIC_BRAND_ARRAY!;
    const logoArr = JSON.parse(data);

    return (
        <div className="grid grid-cols-5 md:grid-cols-7 xl:grid-cols-9 gap-1">
            <LogoBox logoArr={logoArr!} />
        </div>
    );
}
