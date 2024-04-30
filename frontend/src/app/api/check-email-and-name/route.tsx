import { NextResponse, NextRequest } from "next/server";
import { ResponseProps } from "@/app/(default-nav-footer)/category/[...pageType]/component/fetch";

export const dynamic = "force-dynamic";

const CheckEmailAndName = async (request: NextRequest) => {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-email-and-name?email=${email}&name=${name}`
    );
    const result: ResponseProps = await res.json();
    return NextResponse.json({ status: res.status, data: result });
};

export { CheckEmailAndName as GET };
