import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const resetPassword = async (request: Request) => {
    const { accessToken, password } = await request.json();

    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage/resset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password: password }),
    });
    const result = await req.json();
    return NextResponse.json(result);
};

export { resetPassword as POST };
