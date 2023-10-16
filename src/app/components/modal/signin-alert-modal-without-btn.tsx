"use client";
import AlertModalWithoutBtn from "./alert-modal-without-btn";
import { useRouter } from "next/navigation";

export default function SigninAlertModal() {
    const router = useRouter();
    const toLoginPage = () => {
        router.push("/auth/signin");
    };
    return (
        <>
            <div className={`absolute top-0 bg-white w-screen h-screen`}></div>
            <AlertModalWithoutBtn
                title="로그인 알림"
                content="로그인이 필요합니다."
                isOpen={true}
                setIsOpen={() => {}}
                trueCallback={toLoginPage}
            />
        </>
    );
}
