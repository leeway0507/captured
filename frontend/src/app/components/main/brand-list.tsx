import Image from "next/image";
import Link from "next/link";

const evenLogoCard = (brandName: string, idx: number) => {
    const brandNameBar = brandName.replaceAll(" ", "-");
    return (
        <Link key={idx} href={`/category/brand/${brandName}`} className="brand-box-black bg-main-black">
            <Image
                src={`/brands/white/${brandNameBar}-white-logo.png`}
                alt={`${brandNameBar}-logo`}
                height={1000}
                width={1000}
                className="scale-[85%] hover:scale-100 duration-300 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </Link>
    );
};
const oddLogoCard = (brandName: string, idx: number) => {
    const brandNameBar = brandName.replaceAll(" ", "-");
    return (
        <Link key={idx} href={`/category/brand/${brandName}`} className="brand-box">
            <Image
                src={`/brands/black/${brandNameBar}-logo.png`}
                alt={`${brandNameBar}-logo`}
                height={1000}
                width={1000}
                className="scale-[85%] hover:scale-100 duration-300 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </Link>
    );
};

export default function BrandList() {
    const logoArr = JSON.parse(process.env.NEXT_PUBLIC_BRAND_ARRAY!);

    return (
        <div className="grid grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 ">
            {logoArr.map((brandName: string, idx: number) => {
                if (idx % 2 === 0) {
                    return evenLogoCard(brandName, idx);
                } else {
                    return oddLogoCard(brandName, idx);
                }
            })}
        </div>
    );
}
