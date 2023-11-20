"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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
                sizes="100px"
                className="scale-[85%]"
                priority={true}
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
                sizes="100px"
                className="scale-[85%]"
                priority={true}
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
const Logo = ({ logoArr }: { logoArr: string[] }) => {
    return useMemo(() => <LogoBox logoArr={logoArr} />, [logoArr]);
};

export default function BrandList() {
    const logoArr = JSON.parse(process.env.NEXT_PUBLIC_BRAND_ARRAY!);

    return (
        <div className="grid grid-cols-5 md:grid-cols-7 xl:grid-cols-9 gap-1">
            <Logo logoArr={logoArr} />
        </div>
    );
}
