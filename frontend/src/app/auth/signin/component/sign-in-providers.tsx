import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export const handleCredentials = async (email: string, password: string, openModalToggle: () => void) => {
    await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
    }).then((res) => {
        res!.error && openModalToggle();
    });
};

export const handleKakao = async () => {
    await signIn("kakao", {
        redirect: true,
        callbackUrl: "/",
    });
};
export const handleNaver = async () => {
    await signIn("naver", {
        redirect: true,
        callbackUrl: "/",
    });
};
