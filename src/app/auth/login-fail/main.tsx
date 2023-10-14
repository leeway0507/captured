"use client";
import AlertModalWithoutBtn from "@/app/components/modal/alert-modal-without-btn";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginFail() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const content =
        searchParams.get("error") == "TypeError: fetch failed" ? (
            <div className="text-base py-2">
                <div>네트워크 상태를 확인해주세요.</div>
            </div>
        ) : (
            <div className="text-base py-2">
                <div>로그인에 실패했습니다.</div>
            </div>
        );

    // useEffect(() => {
    //     setTimeout(() => {
    //         router.push("/auth/signin");
    //     }, 5000);
    // }, [router]);

    return (
        <>
            <AlertModalWithoutBtn
                title="로그인 실패"
                content={content}
                isOpen={true}
                setIsOpen={() => {}}
                trueCallback={() => router.push("/auth/signin")}
            />
        </>
    );
}
