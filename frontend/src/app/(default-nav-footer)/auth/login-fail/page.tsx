"use client";
import { AlertPopUpModal } from "@/app/components/modal/new-alert-modal";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Page() {
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

    const failureHandler = AlertPopUpModal("로그인 실패", content, "black-bar bg-rose-700 w-full", () =>
        router.push("/auth/signin")
    );

    return failureHandler();
}
