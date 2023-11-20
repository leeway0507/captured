"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="w-full h-screen flex-center">
            <div className="flex flex-col py-16 px-4">
                <div className="relative flex-center flex-col w-full h-full ">
                    <div className="z-50 flex-center flex-col bg-white bg-opacity-70 w-screen pb-16 grow">
                        <div className="text-7xl tb:text-8xl pb-2 not-found-404 py-4 tracking-wider font-bold">404</div>
                        <div className="text-3xl tb:text-4xl pb-4 ">페이지를 찾을 수 없습니다.</div>
                        <div
                            className="text-2xl tb:text-3xl underline link-animation font-bold"
                            onClick={() => router.back()}>
                            이전페이지로 돌아가기
                        </div>
                    </div>
                    <div
                        className="absolute top-50 font-test -rotate-[20deg] text-4xl tb:text-7xl text-rose-600 px-4 py-2  tracking-[0.2rem] border-4   border-rose-600 rounded"
                        style={{ textShadow: "2px 3px 1px lightgrey" }}>
                        CAPTURED
                    </div>
                </div>
            </div>
        </div>
    );
}
