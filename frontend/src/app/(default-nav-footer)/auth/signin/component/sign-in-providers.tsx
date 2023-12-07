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

export const handleKakao = async (openModalToggle: () => void) => {
    await signIn("kakao", {
        redirect: false,
    }).then((res) => {
        res!.error && openModalToggle();
    });
};
export const handleNaver = async (openModalToggle: () => void) => {
    await signIn("naver", {
        redirect: false,
    }).then((res) => {
        res!.error && openModalToggle();
    });
};
