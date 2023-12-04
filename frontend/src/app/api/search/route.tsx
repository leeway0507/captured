import { NextResponse, NextRequest } from "next/server";
export const dynamic = "force-dynamic";

const searchItems = async (request: NextRequest) => {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const keyword = searchParams.get("keyword");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/search?keyword=${keyword}`);
    const result = await res.json();

    return NextResponse.json({ status: res.status, data: result });
};

export { searchItems as GET };
