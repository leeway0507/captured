import Link from "next/link";
import Image from "next/image";
const btnClass =
    "absolute bottom-0 left-0 right-0 w-full bg-rose-700 opacity-60 hover:opacity-100 rounded-b-md  tb:py-1 text-sm mx-auto font-bold text-white";
const linkClass = "w-full aspect-square flex grow relative";
const CategoryList = () => {
    return (
        <>
            <div className="text-xl font-bold px-2 pb-4">추천 카테고리</div>
            <div className="grid grid-cols-2 tb:grid-cols-4 w-full gap-2 tb:gap-4 px-2">
                <Link href={"/category/latest"} className={`${linkClass}`}>
                    <Image src={"/icons/skeleton.png"} alt="default" fill sizes="300px" className="rounded-lg" />
                    <button className={`${btnClass}`}>All</button>
                </Link>
                <Link href={"/category/shoes"} className={`${linkClass}`}>
                    <Image src={"/icons/skeleton.png"} alt="default" fill sizes="300px" className="rounded-lg" />
                    <button className={`${btnClass}`}>SHOES</button>
                </Link>
                <Link href={"/category/clothing"} className={`${linkClass}`}>
                    <Image src={"/icons/skeleton.png"} alt="default" fill sizes="300px" className="rounded-lg" />
                    <button className={`${btnClass}`}>CLOTHING</button>
                </Link>
                <Link href={"/category/accessory"} className={`${linkClass}`}>
                    <Image src={"/icons/skeleton.png"} alt="default" fill sizes="300px" className="rounded-lg" />
                    <button className={`${btnClass}`}>ACCESSORY</button>
                </Link>
            </div>
        </>
    );
};

export default CategoryList;
