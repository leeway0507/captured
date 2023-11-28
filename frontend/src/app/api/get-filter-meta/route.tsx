import { initFilterMetaProps } from "@/app/(default-nav-footer)/category/[...pageType]/type";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const getFilterMeta = async () => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-filter-meta`);
    const result: initFilterMetaProps = await req.json();
    return NextResponse.json(result);
};

export { getFilterMeta as GET };
