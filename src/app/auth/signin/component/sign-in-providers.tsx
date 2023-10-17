import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import AlertModalWithoutBtn from "@/app/components/modal/alert-modal-without-btn";

const FailureModal = (title: string, content: string, openFailureModal: boolean, setOpenFailureModal: () => void) => {
    return AlertModalWithoutBtn({
        title: title,
        content: content,
        isOpen: openFailureModal,
        setIsOpen: setOpenFailureModal,
        checkColor: "red",
    });
};

export const handleCredentials = async (
    email: string,
    password: string,
    openFailureModal: boolean,
    openModalToggle: () => void
) => {
    await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
    })
        .then((res) => {
            res!.error ? FailureModal("로그인 실패", res!.error, openFailureModal, openModalToggle) : redirect("/");
        })
        .catch((err) => {
            console.log("err", err);
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
