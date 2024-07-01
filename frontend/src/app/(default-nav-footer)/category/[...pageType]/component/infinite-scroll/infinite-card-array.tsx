"use client";

import * as api from "../fetch";
import { useState, useEffect, useRef } from "react";
import { ResponseProps } from "../../component/fetch";
import { productCardProps } from "@/app/type";
import ProductCard from "./product-card";
import { useRouter } from "next/navigation";
import { filterRequestProps } from "../../type";
import { useSearchParams, useParams } from "next/navigation";

function addCategoryFilterToFilterDict(pageType: string, filterMeta: filterRequestProps) {
    switch (pageType) {
        case "clothing":
            return (filterMeta.category = "의류");
        case "shoes":
            return (filterMeta.category = "신발");
        case "accessory":
            return (filterMeta.category = "기타");
        case "latest":
            return (filterMeta.category = "");
        case "brand":
            return (filterMeta.brand = pageType[1].replace("%20", " "));
    }
}

const InfiniteCardArrary = ({filter,setFilter}:{filter:{},setFilter:({})=>void}) => {
    const router = useRouter();
    const searchParams = new URLSearchParams(useSearchParams());
    const [localData, setLocalData] = useState<{ [key: number]: productCardProps[] }>({});
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState<number>(1);
    const [noResult, setNoResult] = useState(false);
    const elementRef = useRef(null);
    // searchParams Setting
    const { pageType } = useParams();
    searchParams.delete("page");
    const queryParamsObject = Object.fromEntries(searchParams.entries());


    useEffect(() => {
        addCategoryFilterToFilterDict(pageType[0], queryParamsObject);
        const initFilteredItems = () => {
            setFilter(queryParamsObject);
            setLocalData({});
            setPage(1);
            setHasMore(true);
            localStorage.setItem("category", "{}");
        };
        if (!(JSON.stringify(queryParamsObject) == JSON.stringify(filter))) {
            return initFilteredItems();
        } 
        const localData = localStorage.getItem("category");
        const localCatData = JSON.parse(localData ?? "{}");
        setLocalData(localCatData);
        
    }, [filter]);

    useEffect(() => {
        const cardLoadObserver = new IntersectionObserver(onCardLoadInsersection);
        if (cardLoadObserver && elementRef.current) {
            cardLoadObserver.observe(elementRef.current);
        }
        const pageParamObserver = new IntersectionObserver(onPageParamsIntersection);
        if (pageParamObserver) {
            const triggers = document.querySelectorAll(".page-container");
            triggers.forEach((tirgger) => {
                pageParamObserver.observe(tirgger);
            });
        }

        const timeoutId = initScrollRestoration();
        // console.log("useEffect LocalData Update");

        return () => {
            if (cardLoadObserver) cardLoadObserver.disconnect();
            if (pageParamObserver) pageParamObserver.disconnect();
            clearTimeout(timeoutId);
        };

        function initScrollRestoration() {
            var scrollPosition = sessionStorage.getItem("scrollPosition");
            if (scrollPosition) {
                window.scrollTo(0, Number(scrollPosition));

                return setTimeout(() => {
                    sessionStorage.removeItem("scrollPosition");
                }, 1000); // Adjust the delay as needed
            }
        }

        function onPageParamsIntersection(entries: IntersectionObserverEntry[]) {
            entries.map((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    // console.log("onPageParamsIntersection");
                    const nextPageNum = entry.target.getAttribute("data-page");
                    var params = new URLSearchParams(window.location.search);
                    nextPageNum && params.set("page", nextPageNum);
                    router.replace(`\?${params.toString()}`, { scroll: false });
                }
            });
        }
        function onCardLoadInsersection(entries: any) {
            const firstEntry = entries[0];
            // console.log("onCardLoadInsersection");
            if (firstEntry.isIntersecting && hasMore) {
                fetchMoreItems(queryParamsObject);
            }
        }

        async function fetchMoreItems(filterDict: filterRequestProps) {
            // if (Object.keys(localData).includes((page + 1).toString())) return;

            // console.log("fetchMoreItems : ", page);
            const res: ResponseProps = await api.getCategory(filterDict, page);
            console.log(res)
            if (res.lastPage === 0) return setNoResult(true), setHasMore(false);

            if (res.currentPage > res.lastPage) {
                setHasMore(false);
            } else {
                setNoResult(false);
                setLocalData((localData) => ({ ...localData, [page + 1]: res.data }));
                const localCatData = JSON.parse(localStorage.getItem("category")!);
                localStorage.setItem("category", JSON.stringify({ ...localCatData, [page + 1]: res.data }));
                setPage((prevPage) => prevPage + 1);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, filter]);

    const setScrollPosition = () => {
        sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    return (
        <>
            {noResult ? (
                <div className="flex flex-col mx-auto h-full tb:p-16 ">
                    <div className="text-xl tb:text-3xl pb-2 m-auto">요청 결과가 존재하지 않습니다.</div>
                </div>
            ) : (
                <>
                    {Object.entries(localData).length > 0 ? (
                        Object.entries(localData).map((item, idx) => {
                            return (
                                <div key={item[0]}>
                                    <div
                                        key={idx}
                                        className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 page-container`}
                                        data-page={Number(item[0]) - 1}>
                                        {item[1].map((data) => {
                                            return (
                                                <div key={data.sku} onClick={setScrollPosition}>
                                                    <ProductCard props={data} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* intersection 겹침 방지를 위해 의도적으로 Gap 만듬 */}
                                    <div className="h-[70px] Gap" />
                                </div>
                            );
                        })
                    ) : (
                        <div className="page-container h-[60vh] w-full"></div>
                    )}
                </>
            )}
            <div ref={elementRef} className={hasMore ? "block " : "hidden"} />
        </>
    );
};

export default InfiniteCardArrary;
