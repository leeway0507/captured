import ProductCard from "@/app/(default-nav-footer)/category/[...pageType]/component/infinite-scroll/product-card";

import Link from "next/link";
import { productCardProps } from "@/app/type";
import { getCategoryProxy } from "./fetch";

const ItemList = ({ data }: { data: productCardProps[] }) => {
    return data.slice(0, 20).map((item) => (
        <div key={item.sku} className="flex-none basis-[45%] tb:basis-[22%]">
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

const NewestItem = async () => {
    const filter = {
        sortBy: "최신순",
    };

    const data = await getCategoryProxy(filter, 1).then((res) => {
        return res.data;
    });

    return (
        <div className="tb:px-4 tb:mx-auto w-full max-w-[2048px] overflow-hidden">
            <div className="tb:text-lg tb:text-xl px-2">추천 아이템</div>
            <div className="flex w-full gap-2 p-2 tb:gap-4 tb:py-4 overflow-auto scroll-bar-x">
                {data.length === 0 ? <ItemListSkeleton /> : <ItemList data={data} />}
            </div>
            <div className="flex-center py-2 ">
                <Link
                    href="/category/latest"
                    className="w-64 tb:w-96 border border-main-black text-lg rounded-full text-center py-2 px-4 my-2 cursor-pointer hover:bg-main-black hover:text-white">
                    더보기
                </Link>
            </div>
        </div>
    );
};

export default NewestItem;
