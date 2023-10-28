"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export default function BrandDropDown() {
    const brandsArray = JSON.parse(process.env.NEXT_PUBLIC_BRAND_ARRAY!);

    const [hoveredIndex, setHoveredIndex] = useState<Number | null>(null);

    const handleMouseEnter = (index: Number | null) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    if (brandsArray === undefined) {
        return null;
    }

    return (
        <div className="hidden group-hover:block w-full right-0 top-100 absolute z-50">
            <div className="h-full w-full my-2 text-main-black bg-white shadow-xl ">
                <div className="grid grid-cols-5 lg:grid-cols-6 pt-4 pb-8 gap-2 px-8">
                    {brandsArray.map((brandName: string, idx: number) => {
                        const brandNameBar = brandName.replaceAll(" ", "-");
                        return (
                            <Link
                                href={`/category/brand/${brandNameBar}`}
                                key={idx}
                                className={`flex hover:bg-main-black hover:text-white py-1 hover:rounded-md transition-all duration-300 ease-in`}
                                onMouseEnter={() => handleMouseEnter(idx)}
                                onMouseLeave={handleMouseLeave}>
                                <div
                                    className={`flex-center relative w-[50px] h-[50px] m-auto  ${
                                        idx === hoveredIndex ? "display scale-150" : "hidden"
                                    }`}>
                                    <Image
                                        src={`/brands/white/${brandNameBar}-white-logo.png`}
                                        alt={brandNameBar}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div
                                    className={`flex-center grow capitalize text-center h-[50px] ${
                                        idx === hoveredIndex ? "hidden" : "display"
                                    }`}>
                                    {brandName}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
