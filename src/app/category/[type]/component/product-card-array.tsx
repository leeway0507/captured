"use client";

import { useState, useEffect, useRef } from "react";
import ProductCard from "../component/product-card";
import { productCardProps } from "@/app/type";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/app/components/spinner/spinner";

const ProductCardArrary = ({
    data,
    currentPage,
    lastPage,
}: {
    data: productCardProps[];
    currentPage: number;
    lastPage: number;
}) => {
    const router = useRouter();
    const ref = useRef(null);

    const [localData, setLocalData] = useState<{ [key: number]: productCardProps[] }>({ [currentPage]: data });
    useEffect(() => {
        setLocalData((localData) => ({ ...localData, [currentPage]: data }));
    }, [data, currentPage]);

    // intersection observer 사용
    useEffect(() => {
        // 페이지 번호가 localData에 없으면 localData에 저장
        setLocalData((localData) => ({ ...localData, [currentPage]: data }));

        // intersection observer 사용하기

        // page-container의 마지막 div를 트거로 지정
        const firstContainer = document.querySelectorAll(".page-observer");
        console.log(firstContainer);

        // Obersever 생성 및 트리거 시 수행할 함수 작성(router.push로 page params 업데이트)
        const firstObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.isIntersecting &&
                    (router.push(`${window.location.href.split("?")[0]}?${entry.target.getAttribute("data-next")}`, {
                        scroll: false,
                    }),
                    entry.target.classList.toggle("bg-red-100", entry.isIntersecting));
            });
        }, {});

        // 트리거로 지정한 div들을 Observe 시작
        firstContainer.forEach((item) => {
            firstObserver.observe(item);
        });

        // 더보기 실행을 위한 observer 작성
        // router.refresh 됨에 따라 useEffect를 다시 작동시켜 페이지를 불러오는 방식
        const lastObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.isIntersecting && router.refresh();
                });
            },
            { rootMargin: "200px" }
        );

        // 마지막 페이지 도달 시 더보기 실행 방지
        currentPage < lastPage ? lastObserver.observe(ref.current!) : lastObserver.unobserve(ref.current!);
    }, [data, currentPage, lastPage, router]);

    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;

    return (
        <>
            <Link
                href={`?page=${prevPage}`}
                className={`${Object.keys(localData).includes("1") ? "hidden" : "block"} `}>
                <div className="black-bar-xl my-8">이전으로</div>
            </Link>

            <div>
                {Object.entries(localData).map((item, idx) => {
                    return (
                        <>
                            <div className={`grid grid-cols-2 tb:grid-cols-3 gap-1 page-container`} key={idx}>
                                {item[1].map((data: any) => {
                                    // return ProductCard({ ...data });
                                    return <ProductCard {...data} key={data.sku} />;
                                })}
                            </div>
                            <div
                                className="page-observer h-[50px] w-full"
                                // data-prev={`page=${parseInt(item[0]) - 1}`}
                                data-next={`page=${
                                    parseInt(item[0]) + 1 <= lastPage ? parseInt(item[0]) + 1 : lastPage
                                } `}></div>
                        </>
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
