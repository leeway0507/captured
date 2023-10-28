import Link from "next/link";
import BrandDropDown from "./brand-dropdown";

export function NavPcTop() {
    return (
        <div className="flex justify-between items-center text-sm h-full my-auto font-bold ">
            <Link href="/category/latest">
                <div className="mx-2">LATEST</div>
            </Link>
            <div className="mx-2 group ">
                <Link href="/brands">BRANDS</Link>
                <BrandDropDown />
            </div>
            <Link href="/category/shoes">
                <div className="mx-2 ">SHOES</div>
            </Link>
            <Link href="/category/clothing">
                <div className="mx-2">CLOTHING</div>
            </Link>
            <Link href="/category/accessory">
                <div className="mx-2">ACCESSORY</div>
            </Link>
        </div>
    );
}
