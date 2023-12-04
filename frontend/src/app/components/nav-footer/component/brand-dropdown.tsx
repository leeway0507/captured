"use client";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { getFilterMetaProxy } from "@/app/(default-nav-footer)/category/[...pageType]/component/fetch";

export default function BrandDropDown() {
    const [brandArray, setBrandArray] = useState<string[] | undefined>(undefined);

    useEffect(() => {
        getFilterMetaProxy().then((data) => {
            const brandArray: string[] = data.brand;
            setBrandArray(brandArray);
        });
    }, []);

    const [hoveredIndex, setHoveredIndex] = useState<Number | null>(null);

    const handleMouseEnter = (index: Number | null) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    if (brandArray === undefined) {
        return <></>;
    }

    return (
        <div className="hidden group-hover:block w-full right-0 top-[60px] absolute z-50">
            <div className="h-full w-full my-2 text-main-black bg-white shadow-xl ">
                <div className="grid grid-cols-5 lg:grid-cols-6 pt-4 pb-8 gap-2 px-8">
                    {brandArray.map((brandName: string, idx: number) => {
                        const brandNameBar = brandName.replaceAll(" ", "-");
                        return (
                            <Link
                                href={`/category/brand?brand=${brandName}`}
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
                                        sizes="100px"
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
