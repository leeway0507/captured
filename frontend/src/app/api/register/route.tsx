import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const register = async (request: Request) => {
    const { user_registration, address } = await request.json();

    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_registration, address }),
    });
    const result = req.ok ? true : false;
    return NextResponse.json(result);
};

export { register as POST };
