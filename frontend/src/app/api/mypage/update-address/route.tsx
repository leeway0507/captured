import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const createAddress = async (request: Request) => {
    const { address, accessToken } = await request.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage/update-address`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(address),
    });

    return NextResponse.json({ status: res.status, body: await res.json() });
};

export { createAddress as POST };
