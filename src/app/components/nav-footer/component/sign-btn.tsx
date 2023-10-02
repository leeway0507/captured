import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function SignInOutButton() {
    const { data: session } = useSession();

    if (session && session.user) {
        return <button onClick={() => signOut()}>로그아웃</button>;
    }

    return <button onClick={() => signIn()}>로그인 / 회원가입</button>;
}

export default SignInOutButton;
