"use client";
import NavFooter from "./components/nav-footer/client-side/nav-footer";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <>
            <NavFooter>
                <div className="max-w-2xl w-full flex-left flex-col m-auto py-16 px-4 ">
                    <div className="relative flex-center flex-col w-full h-full ">
                        <div className="z-50 flex-center flex-col bg-white bg-opacity-70 w-screen py-2 grow">
                            <div className="text-5xl tb:text-8xl pb-2 not-found-404 py-4">404</div>
                            <div className="text-3xl tb:text-5xl pb-4 ">페이지를 찾을 수 없습니다.</div>
                            <div className="text-xl tb:text-3xl underline link-animation" onClick={() => router.back()}>
                                이전페이지로 돌아가기
                            </div>
                        </div>
                        <div className="absolute top-50 tb:top-50 text-5xl tb:text-9xl text-rose-600 -rotate-[20deg] border-4 p-2 border-rose-400 ">
                            CAPTURED
                        </div>
                    </div>
                </div>
            </NavFooter>
        </>
    );
}
