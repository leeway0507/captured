import Link from "next/link";
import BrandDropDown from "./brand-dropdown";

export function NavPcTop() {
    return (
        <div className="grid grid-cols-10 text-center px-12 h-full mx-auto max-w-[1440px]">
            <div className="flex-left mx-2 group ">
                <Link href="/brands">BRAND</Link>
                <BrandDropDown />
            </div>
            <div className="col-span-8 flex justify-evenly items-center">
                <Link href="/category/latest">
                    <div className="mx-2 text-left col-span-1">LATEST</div>
                </Link>
                <Link href="/category/shoes">
                    <div className="mx-2">SHOES</div>
                </Link>
                <Link href="/category/clothing">
                    <div className="mx-2">CLOTHING</div>
                </Link>
            </div>
            <Link href="/category/accessory" className="mx-2 col-span-1 w-full flex-right">
                <div>ACCESSORY</div>
            </Link>
        </div>
    );
}
