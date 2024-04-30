"use client";

import { useState, useEffect } from "react";
import ProductCard from "./product-card";
import MockCard from "./mock-card";
import { productCardProps } from "@/app/type";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/app/components/spinner/spinner";
const InfiniteCardArrary = ({
    data,
    currentPage,
    lastPage,
    isNewFilter,
}: {
    data: productCardProps[];
    currentPage: number;
    lastPage: number;
    isNewFilter: boolean;
}) => {
    const router = useRouter();

    // 페이지 번호가 localData에 없으면 localData에 저장
    // setLocalData((localData) => ({ ...localData, [currentPage]: data }));
    const [localData, setLocalData] = useState<{ [key: number]: productCardProps[] }>({ [currentPage]: data });

    // intersection observer 사용
    useEffect(() => {
        // intersection observer 사용하기

        // Obersever 생성 및 트리거 시 수행할 함수 작성(router.push로 page params 업데이트)
        const nextPageObserver = new IntersectionObserver(
            (entries, observer) => {
                // console.log("entry length", entries);
                entries.forEach((entry) => {
                    const nextPageNum = entry.target.getAttribute("data-next");
                    var params = new URLSearchParams(window.location.search);
                    nextPageNum && params.set("page", nextPageNum);

                    router.replace(`\?${params.toString()}`, { scroll: false });
                    observer.unobserve(entry.target);
                });
                return () => {
                    if (observer) observer.disconnect();
                };
            },
            {
                threshold: 1,
            }
        );

        // 트리거 대상 선정
        const triggers = document.querySelectorAll(".page-container");
        // console.log("trigger legnth", triggers.length);
        // 트리거로 지정한 div들을 Observe 시작
        triggers.forEach((tirgger) => {
            nextPageObserver.observe(tirgger);
        });

        isNewFilter
            ? (setLocalData({ [currentPage]: data }),
              nextPageObserver.disconnect(),
              router.replace(window.location.search.split("&isNewFilter")[0]))
            : setLocalData((localData) => ({ ...localData, [currentPage]: data }));
    }, [data, currentPage, isNewFilter, router]);

    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;

    return (
        <>
            <Link
                href={`?page=${prevPage}`}
                className={`${Object.keys(localData).includes("1") ? "hidden" : "block"} `}>
                <div className="border rounded-lg border-deep-gray pointer-cursor py-2 flex-center my-4 tb:my-8 bg-main-black text-white">
                    이전으로
                </div>
            </Link>

            {Object.entries(localData).map((item, idx) => {
                const currentPage = parseInt(item[0]);
                return (
                    <div
                        key={idx}
                        className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 page-container`}
                        data-next={`${currentPage + 1 <= lastPage ? currentPage + 1 : lastPage}`}>
                        {item[1].map((data) => {
                            return (
                                <div key={data.sku}>
                                    {/* <ProductCard props={data} /> */}
                                    <MockCard props={data} />
                                </div>
                            );
                        })}
                    </div>
                );
            })}

            <div className={`${nextPage < lastPage + 1 ? "block" : "hidden"}`}>
                <Spinner />
            </div>
        </>
    );
};

export default InfiniteCardArrary;
