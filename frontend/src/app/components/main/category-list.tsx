import Link from "next/link";
import Image from "next/image";
const linkClass = "w-full aspect-square flex grow relative m-0";
const btnClass =
    "w-full bg-main-black opacity-80 hover:opacity-100 rounded-b-md text-sm mx-auto font-bold text-white py-0.5";
const CategoryList = () => {
    return (
        <div className="tb:px-4">
            <div className="text-xl font-bold px-2 pb-4">카테고리</div>
            <div className="grid grid-cols-2 tb:grid-cols-4 w-full gap-2 tb:gap-4 px-2">
                <Link href={"/category/latest"} className="flex flex-col">
                    <div className={`${linkClass}`}>
                        <Image src={"/icons/all.png"} alt="default" fill sizes="300px" className="rounded-t-lg" />
                    </div>
                    <button className={`${btnClass}`}>All</button>
                </Link>
                <Link href={"/category/shoes"} className="flex flex-col">
                    <div className={`${linkClass}`}>
                        <Image src={"/icons/shoes.png"} alt="default" fill sizes="300px" className="rounded-t-lg" />
                    </div>
                    <button className={`${btnClass}`}>SHOES</button>
                </Link>
                <Link href={"/category/clothing"} className="flex flex-col">
                    <div className={`${linkClass}`}>
                        <Image src={"/icons/clothing.png"} alt="default" fill sizes="300px" className="rounded-t-lg" />
                    </div>
                    <button className={`${btnClass}`}>CLOTHING</button>
                </Link>
                <Link href={"/category/accessory"} className="flex flex-col">
                    <div className={`${linkClass}`}>
                        <Image src={"/icons/accessory.png"} alt="default" fill sizes="300px" className="rounded-t-lg" />
                    </div>
                    <button className={`${btnClass}`}>ACCESSORY</button>
                </Link>
            </div>
        </div>
    );
};

export default CategoryList;
