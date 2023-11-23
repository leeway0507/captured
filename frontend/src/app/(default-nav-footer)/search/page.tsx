"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RelatedProducts from "../product/[sku]/component/recent-view-products";
import Link from "next/link";
import useMobile from "@/app/components/hook/use-mobile";
import PageLoading from "@/app/components/loading/page-loading";

const Page = () => {
    const [searchResult, setSearchResult] = useState<string[]>([]);
    const router = useRouter();
    const { isMobile } = useMobile();
    isMobile === false && router.push("/");

    useEffect(() => {
        const searchResult = localStorage.getItem("searchResult");

        if (searchResult) {
            const data = JSON.parse(searchResult);
            return setSearchResult(data);
        }
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const inputRef = useRef<HTMLInputElement>(null);

    const saveSearchResult = (search: string) => {
        searchResult.includes(search) && searchResult.splice(searchResult.indexOf(search), 1);
        const newData = [search, ...searchResult];
        if (newData.length > 20) newData.pop();
        return localStorage.setItem("searchResult", JSON.stringify(newData));
    };

    const handleKeyDown = (e: any) => {
        if (e.key !== "Enter") return;

        const search = inputRef.current?.value;
        search ? saveSearchResult(search) : alert("검색어를 입력해 주세요.");
        router.push(`/search?value=${search}`);
    };

    if (isMobile === undefined) return PageLoading();

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="fixed top-0 z-50 h-[80px] w-full flex items-center justify-between px-2 bg-white border-b-2">
                <button onClick={() => router.back()}>
                    <Image src={"/icons/white/goback-white.svg"} width={30} height={30} alt="goBack" />
                </button>

                <div className="relative w-full px-4">
                    <Image
                        src={"/icons/white/search-input-white.svg"}
                        width={18}
                        height={18}
                        alt="search-input"
                        className="absolute ms-2 top-0 bottom-0 h-full opacity-50"
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full h-[40px]  bg-light-gray border-none text-main-black placeholder-blue-black caret-blue-black ps-8 text-sm rounded-lg focus:ring-gray-300 focus-border-gray-300" // placeholder
                        onKeyDown={handleKeyDown}
                        placeholder="제품명, 브랜드명 겸색"
                        autoFocus
                        id="search-input"
                    />
                </div>
            </div>
            <div className="pt-[30px] flex flex-col h-full bg-light-gray justify-between">
                <div className=" bg-white border-y px-2 mt-3  py-4 w-full">
                    <div className="text-xl font-bold">브랜드</div>
                    <div className="flex gap-4 overflow-auto">
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                        <div className="flex-shrink-0 px-2 mx-2 h-[70px] w-[70px] bg-green-200 "></div>
                    </div>
                </div>
                <div className=" bg-white border-y p-2 mt-3  ">
                    <div className="text-xl font-bold bg-white">최근 검색어</div>
                    <div className="overflow-auto max-h-[500px]">
                        {searchResult.map((search, idx) => (
                            <Link href={`search?value=${search}`} key={idx} className="py-4 px-6 flex justify-between">
                                {search}
                                <Image
                                    src={"/icons/white/search-again-white.svg"}
                                    width={18}
                                    height={18}
                                    alt="search-again"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className=" bg-white p-2 border-y mt-3 ">
                    <RelatedProducts />
                </div>
            </div>
        </div>
    );
};

export default Page;
