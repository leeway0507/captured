import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const customUnderLine = "font-bold underline underline-offset-[11px] decoration-2";

export default function MobileFilterNav({
    isOpen,
    openToggle,
    pageType,
}: {
    isOpen: boolean;
    openToggle: (v: any) => void;
    pageType: string;
}) {
    return (
        <div className="tb:hidden px-2 flex items-center  w-full whitespace-nowrap scroll-bar-x bg-white">
            <div className="basis-1/5 border-b">
                <button className=" flex-left" onClick={openToggle}>
                    {isOpen ? (
                        <Image
                            src={"/icons/white/x-mark-white.svg"}
                            alt="x-mark"
                            width="20"
                            height="20"
                            className="m-2 me-6"
                            priority
                        />
                    ) : (
                        <Image
                            src={"/icons/white/filter-white.svg"}
                            alt="search"
                            width="20"
                            height="20"
                            className="m-2 me-6"
                            priority
                        />
                    )}
                </button>
            </div>
            <div className="flex grow justify-between items-center text-sm border-b">
                {pageType === "brand" ? <BrandPageNav /> : <LatestPageNav pageType={pageType} />}
            </div>
        </div>
    );
}

const LatestPageNav = ({ pageType }: { pageType: string }) => {
    return (
        <>
            <Link href="/category/latest" className={`ps-0 p-2 ${pageType === "latest" && customUnderLine}`}>
                All
            </Link>
            <Link href="/category/shoes" className={`p-2 ${pageType === "shoes" && customUnderLine}`}>
                SHOES
            </Link>
            <Link href="/category/clothing" className={`p-2 ${pageType === "clothing" && customUnderLine}`}>
                CLOTHING
            </Link>
            <Link href="/category/accessory" className={`pe-0 p-2 ${pageType === "accessory" && customUnderLine}`}>
                ACCESSORY
            </Link>
        </>
    );
};
const BrandPageNav = () => {
    const { pageType } = useParams();
    const brandName = pageType[1].replace("%20", " ");
    return <div className="p-2 flex-left w-full font-bold uppercase">{brandName}</div>;
};
