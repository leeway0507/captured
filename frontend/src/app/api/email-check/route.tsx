import { NextResponse, NextRequest } from "next/server";
export const dynamic = "force-dynamic";

const checkEmailDuplication = async (request: NextRequest) => {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const email = searchParams.get("email");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/email-check?email=${email}`);

    return NextResponse.json({ status: res.status, data: await res.json() });
};

export { checkEmailDuplication as GET };
