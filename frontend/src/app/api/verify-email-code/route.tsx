import { NextResponse, NextRequest } from "next/server";
export const dynamic = "force-dynamic";

const verifyEmailCode = async (request: NextRequest) => {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const email = searchParams.get("email");
    const code = searchParams.get("code");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-code?email=${email}&code=${code}`);
    const result = await res.json();

    return NextResponse.json({ status: res.status, data: result });
};

export { verifyEmailCode as GET };
