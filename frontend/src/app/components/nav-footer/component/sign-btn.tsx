"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function SignInOutButton() {
    const { data: session } = useSession();
    const url = window.location.origin;

    return session && session.user ? (
        <button onClick={() => signOut({ callbackUrl: url })}>로그아웃</button>
    ) : (
        <button onClick={() => signIn()}>로그인 / 회원가입</button>
    );
}

export default SignInOutButton;
