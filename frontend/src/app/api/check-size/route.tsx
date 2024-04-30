import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const checkSize = async (request: Request) => {
    const form = await request.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/check-size`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    });

    return NextResponse.json({ status: res.status, data: await res.json() });
};

export { checkSize as POST };
