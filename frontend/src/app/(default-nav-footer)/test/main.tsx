"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { AlertPopUpModal } from "@/app/components/modal/new-alert-modal";
import { useEffect } from "react";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";

// 결제 플로우 확인 : captured/keynote/flow

const Main = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setModalOpen, isModalOpen } = useShoppingCart();

    useEffect(() => {
        console.log(isModalOpen);
        if (isModalOpen) {
            setModalOpen(false);
        }
    }, []);

    // const failureHandler = AlertPopUpModal(
    //     "결제 실패",
    //     <div className="py-4">
    //         <div className="pb-2">{searchParams.get("message")!}</div>
    //         <div className="text-sm">({searchParams.get("code")!})</div>
    //     </div>,
    //     "black-bar bg-rose-700 w-full",
    //     () => {
    //         router.push("/order");
    //     }
    // );
    const failureHandler = AlertPopUpModal(
        "로그인 실패",
        <div className="py-4">
            <div>아이디 또는 비밀번호를 확인해주세요.</div>
        </div>,
        "black-bar bg-rose-700 w-full",
        () => {}
    );

    return (
        <button className="black-bar w-72" onClick={failureHandler}>
            s
        </button>
    );
};

export default Main;
