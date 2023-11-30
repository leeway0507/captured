import Image from "next/image";
import Link from "next/link";

const linkClass = "opacity-80 brand-box-black rounded-full tb:rounded-2xl aspect-square tb:aspect-[2/1]";
const divClass = "relative h-[50px] tb:h-[100px] xl:h-[150px] aspect-square ";
const ImageClass = "scale-[100%] tb:scale-[100%] ";
const evenLogoCard = (brandName: string, idx: number) => {
    const brandNameBar = brandName.replaceAll(" ", "-").toLowerCase();
    return (
        <Link key={idx} href={`category/brand?brand=${brandName}`} className={`${linkClass} bg-main-black flex-center`}>
            <div className={`${divClass}`}>
                <Image
                    src={`/brands/white/${brandNameBar}-white-logo.png`}
                    alt={`${brandNameBar}-logo`}
                    fill
                    sizes="(min-width: 1280px) 150px, (min-width: 780px) 100px, 50px"
                    className={ImageClass}
                />
            </div>
        </Link>
    );
};
const oddLogoCard = (brandName: string, idx: number) => {
    const brandNameBar = brandName.replaceAll(" ", "-").toLowerCase();
    return (
        <Link key={idx} href={`category/brand?brand=${brandName}`} className={`${linkClass} bg-gray-300 flex-center`}>
            <div className={`${divClass}`}>
                <Image
                    src={`/brands/black/${brandNameBar}-logo.png`}
                    alt={`${brandNameBar}-logo`}
                    fill
                    sizes="(min-width: 1280px) 150px, (min-width: 780px) 100px, 50px"
                    className={ImageClass}
                />
            </div>
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
    const logoArr = [
        "adidas originals",
        "arc'teryx",
        "asics",
        "polo",
        "nike",
        "stone island",
        "the north face",
        "patagonia",
        "human made",
    ];

    return (
        <div className="tb:px-4">
            <div className="text-xl font-bold px-2 pb-4">인기 브랜드</div>
            <div className="grid grid-cols-5 gap-2 tb:gap-3 px-2">
                <LogoBox logoArr={logoArr!} />
                <Link
                    href={"/brands"}
                    className={`opacity-80 brand-box-black rounded-full tb:rounded-2xl h-full bg-gray-300`}>
                    <div className="flex-center h-full font-bold tb:text-lg xl:text-xl">더보기</div>
                </Link>
            </div>
        </div>
    );
}
