"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RelatedProducts from "../product/[sku]/component/recent-view-products";
import Link from "next/link";
import useMobile from "@/app/components/hook/use-mobile";
import { SearchResultSkeleton } from "./skeleton";
import { getFilterMetaProxy } from "../category/[...pageType]/component/fetch";

const Main = () => {
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
        router.push(`/search/${search}`);
    };

    const SearchBar = () => (
        <div className="fixed top-0 z-50 h-[80px] w-full flex items-center justify-between px-2 bg-white border-b-2">
            <button onClick={() => router.back()}>
                <Image src={"/icons/white/goback-white.svg"} width={30} height={30} alt="goBack" priority />
            </button>

            <div className="relative w-full px-4">
                <Image
                    src={"/icons/white/search-input-white.svg"}
                    width={18}
                    height={18}
                    alt="search-input"
                    className="absolute ms-2 top-0 bottom-0 opacity-50 my-auto"
                    priority
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
    );

    const LogoCard = ({ brandName, idx }: { brandName: string; idx: number }) => {
        const brandNameBar = brandName.replaceAll(" ", "-").toLowerCase();
        return (
            <Link
                href={`/category/brand/${brandName}`}
                className="relative brand-box-black bg-black aspect-square h-[70px] rounded-full ">
                <Image
                    src={`/brands/white/${brandNameBar}-white-logo.png`}
                    alt={`${brandNameBar}-logo`}
                    fill
                    sizes="(min-width: 1560px) 150px, (min-width: 1280px) calc(6.92vw + 43px), (min-width: 780px) calc(14.38vw - 10px), calc(20vw - 4px)"
                    priority={idx < 5 ? true : false}
                    className="scale-[80%]"
                />
            </Link>
        );
    };

    const BrandHorizontalArr = () => {
        const [logoArr, setLogoArr] = useState<string[]>([]);
        useEffect(() => {
            getFilterMetaProxy().then((res) => {
                setLogoArr(res.brand);
            });
        }, []);

        return (
            <div className="flex gap-4 overflow-auto">
                {logoArr.map((brandName: string, idx: number) => (
                    <LogoCard brandName={brandName} idx={idx} key={brandName} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-[calc(100svh_-_50px)] h-full flex flex-col overflow-hidden">
            <SearchBar />
            <div className="flex grow h-full pt-[30px] flex flex-col h-full bg-light-gray">
                <div className="bg-white border-y p-2 mt-3 pb-4">
                    <div className="text-xl font-bold bg-white pb-4">최근 검색어</div>
                    <div className="flex gap-4 overflow-auto ">
                        {isMobile === undefined && <SearchResultSkeleton />}
                        {searchResult.map((search, idx) => (
                            <Link
                                href={`search/${search}`}
                                key={idx}
                                className="flex-none bg-white py-2 px-4 rounded-2xl border text-sm">
                                <div className="h-5">{search}</div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="bg-white border-y px-2 mt-3 py-4 w-full">
                    <div className="text-xl font-bold bg-white pb-4">브랜드</div>
                    <BrandHorizontalArr />
                </div>

                <div className="flex flex-col grow bg-white p-2 border-y mt-3 justify-end">
                    <RelatedProducts />
                </div>
            </div>
        </div>
    );
};

export default Main;
