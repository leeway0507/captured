"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { AlertPopUpModal } from "@/app/components/modal/new-alert-modal";
import { useEffect } from "react";

// 결제 플로우 확인 : captured/keynote/flow

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const failureHandler = AlertPopUpModal(
        "결제 실패",
        <div className="py-4">
            <div className="pb-2">{searchParams.get("message")!}</div>
            <div className="text-sm">({searchParams.get("code")!})</div>
        </div>,
        "black-bar bg-rose-700 w-full",
        () => {
            router.push("/order");
        }
    );
    useEffect(() => {
        failureHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return;
};

export default Page;
