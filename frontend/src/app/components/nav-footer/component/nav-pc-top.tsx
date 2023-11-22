import Link from "next/link";
import BrandDropDown from "./brand-dropdown";

export function NavPcTop() {
    return (
        <div className="grid grid-cols-10 text-center">
            <Link href="/category/latest">
                <div className="mx-2 text-left col-span-1">LATEST</div>
            </Link>
            <div className="col-span-8 flex justify-evenly">
                <div className="mx-2 group ">
                    <Link href="/brands">BRAND</Link>
                    <BrandDropDown />
                </div>
                <Link href="/category/shoes">
                    <div className="mx-2">SHOES</div>
                </Link>
                <Link href="/category/clothing">
                    <div className="mx-2">CLOTHING</div>
                </Link>
            </div>
            <Link href="/category/accessory" className="mx-2 col-span-1">
                <div className="text-center">ACCESSORY</div>
            </Link>
        </div>
    );
}
