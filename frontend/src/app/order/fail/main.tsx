"use client";
import AlertModalWithoutBtn from "@/app/components/modal/alert-modal-without-btn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

// 결제 플로우 확인 : captured/keynote/flow

const Main = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const FailureModal = () => {
        return AlertModalWithoutBtn({
            title: `결제실패`,
            content: (
                <>
                    <div>{searchParams.get("message")!}</div>
                    <div className="text-sm">({searchParams.get("code")!})</div>
                </>
            ),
            isOpen: true,
            setIsOpen: () => {},
            checkColor: "red",
            trueCallback: () => {
                router.push("/order");
            },
        });
    };

    return <FailureModal />;
};

export default Main;
