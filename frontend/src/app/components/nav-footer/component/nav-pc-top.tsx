import Link from "next/link";
import BrandDropDown from "./brand-dropdown";

export function NavPcTop() {
    return (
        <div className="text-sm grid grid-cols-8 text-center px-12 h-full mx-auto max-w-[768px]">
            <div className="flex-left mx-2 group ">
                <Link href="/brands">BRAND</Link>
                <BrandDropDown />
            </div>
            <div className="col-span-6 flex justify-evenly items-center">
                <Link href="/category/latest">LATEST</Link>
                <Link href="/category/shoes">SHOES</Link>
                <Link href="/category/clothing">CLOTHING</Link>
            </div>
            <Link href="/category/accessory" className="mx-2 w-full flex-right">
                <div>ACCESSORY</div>
            </Link>
        </div>
    );
}
