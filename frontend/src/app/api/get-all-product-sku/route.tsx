import { NextResponse, NextRequest } from "next/server";
export const dynamic = "force-dynamic";

const getAllProductSku = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-all-product-sku`);

    return NextResponse.json({ status: res.status, data: await res.json() });
};

export { getAllProductSku as GET };
