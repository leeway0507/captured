import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const getAddress = async (request: Request) => {
    const { accessToken } = await request.json();

    if (accessToken == undefined) {
        return [];
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage/get-address`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await res.json();
    return NextResponse.json(data);
};

export { getAddress as POST };
