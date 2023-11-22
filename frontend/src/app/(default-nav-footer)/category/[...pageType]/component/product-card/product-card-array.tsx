"use client";

import { useState, useEffect, useRef } from "react";
import ProductCard from "./product-card";
import { productCardProps } from "@/app/type";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/app/components/spinner/spinner";
const ProductCardArrary = ({
    data,
    currentPage,
    lastPage,
    refresh,
}: {
    data: productCardProps[];
    currentPage: number;
    lastPage: number;
    refresh: boolean;
}) => {
    const router = useRouter();
    const ref = useRef(null);

    const [localData, setLocalData] = useState<{ [key: number]: productCardProps[] }>({ [currentPage]: data });

    // intersection observer 사용
    useEffect(() => {
        // 페이지 번호가 localData에 없으면 localData에 저장
        // setLocalData((localData) => ({ ...localData, [currentPage]: data }));

        // intersection observer 사용하기

        // 트리거 대상 선정
        const triggers = document.querySelectorAll(".page-observer");

        // Obersever 생성 및 트리거 시 수행할 함수 작성(router.push로 page params 업데이트)
        const nextPageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const url = window.location.href.split(/[?&]page=/)[0];
                    const nextPageInfo = entry.target.getAttribute("data-next");
                    const nextPageQuery = url.includes("?") ? `&${nextPageInfo}` : `?${nextPageInfo}`;

                    router.push(`${url}${nextPageQuery}`, {
                        scroll: false,
                    });
                }
            });
        }, {});

        // 트리거로 지정한 div들을 Observe 시작
        triggers.forEach((tirgger) => {
            nextPageObserver.observe(tirgger);
        });

        refresh
            ? (setLocalData({ [currentPage]: data }),
              nextPageObserver.disconnect(),
              router.push(window.location.search.split("&refresh")[0]))
            : setLocalData((localData) => ({ ...localData, [currentPage]: data }));

        // 더보기 실행을 위한 추가 observer 작성
        // router.refresh 됨에 따라 useEffect를 다시 작동시켜 페이지를 불러오는 방식
        const loadMoreObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.isIntersecting && router.refresh();
                });
            },
            { rootMargin: "200px" }
        );

        // 마지막 페이지 도달 시 더보기 실행 방지
        currentPage < lastPage ? loadMoreObserver.observe(ref.current!) : loadMoreObserver.unobserve(ref.current!);
    }, [data, currentPage, router, refresh, lastPage]);

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

            <div>
                {Object.entries(localData).map((item, idx) => {
                    const currentPage = parseInt(item[0]);
                    return (
                        <div key={idx}>
                            <div className={`grid grid-cols-2 lg:grid-cols-3 gap-1 page-container`}>
                                {item[1].map((data) => {
                                    return (
                                        <div key={data.sku} className={`relative ${data.size === "" && "opacity-60"}`}>
                                            {data.size === "" && (
                                                <div className="absolute top-[5%] left-0 text-main-black ">SoldOut</div>
                                            )}
                                            <ProductCard {...data} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div
                                className="page-observer h-[50px] w-full"
                                data-next={`page=${currentPage + 1 <= lastPage ? currentPage + 1 : lastPage} `}></div>
                        </div>
                    );
                })}
            </div>
            <Link ref={ref} href={`?page=${nextPage}`} className={`${nextPage < lastPage + 1 ? "block" : "hidden"}`}>
                <Spinner />
            </Link>
        </>
    );
};

export default ProductCardArrary;
