"use client";

import { useSession } from "next-auth/react";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";

export default function Main({ orderHistory }: { orderHistory: JSX.Element }) {
    const { data: session } = useSession();

    return (
        <>
            <div className="tb:hidden">
                <MainMobile signUpType={session?.user.signUpType!} orderHistory={orderHistory} />
            </div>
            <div className="hidden tb:block">
                <MainPc signUpType={session?.user.signUpType!} orderHistory={orderHistory} />
            </div>
        </>
    );
}
