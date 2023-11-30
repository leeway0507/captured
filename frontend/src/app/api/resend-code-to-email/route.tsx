import { NextResponse, NextRequest } from "next/server";
export const dynamic = "force-dynamic";

const reSendCodeToEmail = async (request: NextRequest) => {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const email = searchParams.get("email");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-code-to-email?email=${email}`);
    const result = await res.json();

    return NextResponse.json({ status: res.status, data: result });
};

export { reSendCodeToEmail as GET };
