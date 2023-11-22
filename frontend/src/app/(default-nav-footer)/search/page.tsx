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
        <div className="h-[calc(100svh_-_50px)] flex flex-col">
            <div className="fixed top-0 z-50  h-[80px] w-full flex items-center justify-between px-2 bg-light-gray">
                <button onClick={() => router.back()}>
                    <Image src={"/icons/white/goback-white.svg"} width={30} height={30} alt="goBack" />
                </button>
                <input
                    ref={inputRef}
                    type="text"
                    className="basis-4/5 w-full h-[40px]  bg-white border-none text-main-black placeholder-blue-black text-sm rounded-lg focus:ring-gray-300 focus-border-gray-300" // placeholder
                    onKeyDown={handleKeyDown}
                    placeholder="검색"
                    autoFocus
                    id="search-input"
                />
                <Link href={"/"}>
                    <Image src={"/icons/white/home-white.svg"} width={30} height={30} alt="home" />
                </Link>
            </div>
            <div className="pt-[30px] px-2 flex flex-col h-full">
                {/* <div className="text-xl font-bold">최근 검색어</div> */}
                <div className="overflow-auto pb-4 mb-2">
                    {searchResult.map((search, idx) => (
                        <Link href={`search?value=${search}`} key={idx} className="py-4 px-10 flex justify-between">
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

                <RelatedProducts />
            </div>
        </div>
    );
};

export default Page;
