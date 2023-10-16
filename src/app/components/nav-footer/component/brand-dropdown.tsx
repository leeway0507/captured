"use client";
import Image from "next/image";
import Link from "next/link";

export default function BrandDropDown() {
    const brands = [
        "Adidas originals",
        "Adidas originals",
        "Adidas originals",
        "Adidas originals",
        "Adidas originals",
        "Adidas originals",
        "Nike",
        "Puma",
        "Reebok",
        "Vans",
        "Converse",
        "New Balance",
        "Asics",
        "Fila",
        "Crocs",
        "Birkenstock",
        "Dr. Martens",
        "Timberland",
        "Skechers",
        "Clarks",
        "Onitsuka Tiger",
        "Bata",
        "Kappa",
        "Saucony",
        "Under Armour",
        "Babolat",
        "Li-Ning",
        "Mizuno",
        "Yonex",
        "Wilson",
        "Head",
        "Prince",
        "Casio G-Shock G-MS",
    ];
    return (
        <div className="hidden group-hover:block w-full right-0 top-100 absolute ">
            <div className="h-full w-full my-2 text-main-black bg-white shadow-lg border-t">
                <div className="grid grid-cols-6 pt-8 pb-16 px-4 gap-2">
                    {brands.map((brandName: string, idx) => {
                        const brandNameBar = brandName.replace(" ", "-");
                        return (
                            <Link
                                href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/category/brand/${brandNameBar}`}
                                key={idx}
                                className="flex hover:bg-main-black hover:text-white">
                                <div className="relative w-[50px] h-[50px]">
                                    {/* <Image src={`/brands/${brandNameBar}-white-logo.png`} alt="main logo" fill /> */}
                                    <Image src={`/brands/adidas-originals-white-logo.png`} alt="main logo" fill />
                                </div>
                                <div className="flex-center text-sm grow ">{brandName}</div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
