import { responseProps } from "@/app/(default-nav-footer)/category/[...pageType]/component/fetch";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const getCategory = async (request: Request) => {
    const filter = await request.json();
    const searchParams = new URLSearchParams(request.url.split("?")[1]);
    const page = searchParams.get("page");

    const req = await fetch(`${process.env.NEXT_PUBLIC_GOLANG_API_URL}/api/product/category?page=${page}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
    });
    const result: responseProps = await req.json();
    return NextResponse.json(result);
};

export { getCategory as POST };
