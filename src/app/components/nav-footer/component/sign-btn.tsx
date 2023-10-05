import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function SignInOutButton() {
    const { data: session } = useSession();

    if (session && session.user) {
        return <div onClick={() => signOut()}>로그아웃</div>;
    }

    return <div onClick={() => signIn()}>로그인 / 회원가입</div>;
}

export default SignInOutButton;
