import { Suspense } from "react";
import { productCardProps } from "@/app/type";
import ProductCard from "./product-card";
import { getCategory } from "./fetch";
import CateogryClient from "../client";

export const ProductCardArr = async () => {
    const data: productCardProps[] = await getCategory();
    return (
        <CateogryClient data={data}>
            <Suspense fallback={<div>Suspense Loading.....</div>}>
                <div className={`grid grid-cols-2 tb:grid-cols-3 gap-1`}>
                    {data.map((props) => {
                        return ProductCard({ ...props });
                    })}
                </div>
            </Suspense>
        </CateogryClient>
    );
};
