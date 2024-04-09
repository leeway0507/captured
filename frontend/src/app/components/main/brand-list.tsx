import Image from "next/image";
import Link from "next/link";

const linkClass = "py-8 tb:px-16";
const divClass = "relative w-[120px] aspect-square tb:w-[150px] ";
const ImageClass = "object-contain";
const oddLogoCard = (brandName: string, idx: number) => {
    const brandNameBar = brandName.replaceAll(" ", "-").toLowerCase();
    return (
        <Link key={idx} href={`category/brand/${brandName}`} className={`${linkClass} flex-center px-8`}>
            <div className={`${divClass}`}>
                <Image
                    src={`/brands/black/${brandNameBar}-logo.png`}
                    alt={`${brandNameBar}-logo`}
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 780px) 160px"
                    className={ImageClass}
                />
            </div>
        </Link>
    );
};

const LogoBox = ({ logoArr }: { logoArr: string[] }) => {
    return logoArr.map((brandName: string, idx: number) => {
        return oddLogoCard(brandName, idx);
    });
};

export default async function BrandList() {
    const logoArr = [
        "acne studios",
        "arc'teryx",
        "adidas originals",
        "our legacy",
        "stone island",
        "patagonia",
        "the north face",
    ];

    return (
        <div className="tb:px-4 bg-gray-100 ">
            <div className="flex justify-between px-2 scroll-bar-x">
                <LogoBox logoArr={logoArr!} />
                <Link href={"/brands"}>
                    <div className={`${linkClass} ${divClass} whitespace-nowrap text-xl font-bold flex-center h-full`}>
                        더보기
                    </div>
                </Link>
            </div>
        </div>
    );
}
