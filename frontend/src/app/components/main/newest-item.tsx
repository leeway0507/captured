"use client";
import ProductCard from "@/app/(default-nav-footer)/category/[...pageType]/component/product-card/product-card";
import { useEffect, useState } from "react";
import { getCategory } from "@/app/(default-nav-footer)/category/[...pageType]/component/fetch";
import Link from "next/link";
import { productCardProps } from "@/app/type";
import { RelatedProductsSkeleton } from "@/app/(default-nav-footer)/search/skeleton";

const ItemList = ({ data }: { data: productCardProps[] }) => {
    return data.slice(0, 12).map((item) => (
        <div key={item.sku} className="flex-none basis-[45%] tb:basis-[20%]">
            <ProductCard idx={item.sku} props={item} />
        </div>
    ));
};

const ItemListSkeleton = () => {
    return [1, 2, 3, 4, 5].map((v) => (
        <div key={v} className="flex-none basis-[45%] tb:basis-[20%] animate-pulse">
            <div className="flex-center grow w-full aspect-square bg-gray-300 rounded-xl"></div>
            <div className="w-full rounded-full h-3 bg-gray-300 mt-2"></div>
            <div className="w-full rounded-full h-3 bg-gray-300 mt-2"></div>
        </div>
    ));
};

const NewestItem = () => {
    const [data, setData] = useState<productCardProps[]>([]);
    useEffect(() => {
        const filter = {
            sortBy: "최신순",
            category: undefined,
            categorySpec: undefined,
            brand: undefined,
            intl: undefined,
            price: undefined,
            sizeArray: undefined,
        };
        getCategory(filter, 1).then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <div>
            <div className="text-xl font-bold px-2">신규 아이템</div>
            <div className="flex w-full overflow-auto gap-2 px-2 py-2 tb:gap-4 tb:py-4">
                {data.length === 0 ? <ItemListSkeleton /> : <ItemList data={data} />}
            </div>
            <div className="flex-center py-2 ">
                <Link
                    href="/category/latest"
                    className="w-72 tb:w-96 border border-main-black py-2 text-lg rounded-md text-center px-4 my-2 cursor-pointer ">
                    더보기
                </Link>
            </div>
        </div>
    );
};

export default NewestItem;
