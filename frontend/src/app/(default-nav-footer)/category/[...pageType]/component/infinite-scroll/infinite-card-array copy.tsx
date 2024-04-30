"use client";
import * as api from "../fetch";
import { useState, useEffect, useRef } from "react";
import { responseProps } from "../../component/fetch";
import { productCardProps } from "@/app/type";
import ProductCard from "./product-card";
import MockCard from "./mock-card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/app/components/spinner/spinner";
const InfiniteCardArrary = () => {
    const [localData, setLocalData] = useState<productCardProps[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const elementRef = useRef(null);

    function onInsersection(entries: any) {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore) {
            fetchMoreItems();
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onInsersection);
        if (observer && elementRef.current) {
            observer.observe(elementRef.current);
        }
        return () => {
            if (observer) observer.disconnect();
        };
    }, [localData]);

    async function fetchMoreItems() {
        var filterDict = {};
        const res: responseProps = await api.getCategoryMock(filterDict, page || 1);
        if (res.lastPage == res.currentPage) {
            setHasMore(false);
        } else {
            setLocalData((prevData) => [...prevData, ...res.data]);
            setPage((prevPage) => prevPage + 1);
        }
    }

    return (
        <>
            <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 page-container`}>
                {localData.map((data) => {
                    return (
                        <div key={data.sku}>
                            {/* <ProductCard props={data} /> */}
                            <MockCard props={data} />
                        </div>
                    );
                })}
            </div>
            <div ref={elementRef} className={hasMore ? "block" : "hidden"}>
                <Spinner />
            </div>
        </>
    );
};
export default InfiniteCardArrary;
