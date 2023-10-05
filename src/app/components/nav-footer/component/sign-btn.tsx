import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function SignInOutButton() {
    const { data: session } = useSession();

    return (
        <div className="w-full h-full">
            {session && session.user ? (
                <div onClick={() => signOut({ callbackUrl: "/" })}>로그아웃</div>
            ) : (
                <div onClick={() => signIn()}>로그인 / 회원가입</div>
            )}
        </div>
    );
}

export default SignInOutButton;
