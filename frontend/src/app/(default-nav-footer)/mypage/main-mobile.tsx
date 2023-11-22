"use client";
import AccordionComponent from "@/app/components/accordion/accordion";
import ResetPasswordFrom from "./component/reset-password-form";
import AddressInfoFrom from "./component/address-info";

import { signOut } from "next-auth/react";
import { ConfirmPopUpModal } from "@/app/components/modal/new-yes-no-modal";

const LogOutButton = () => {
    const callback = () => {
        signOut({ callbackUrl: "/" });
    };

    const handler = ConfirmPopUpModal("로그아웃", "로그아웃 하시겠습니까?", callback);
    return (
        <button onClick={handler} className="link-animation py-3">
            로그아웃
        </button>
    );
};

export default function MobileMain({ signUpType, orderHistory }: { signUpType: string; orderHistory: JSX.Element }) {
    return (
        <>
            <div className="flex flex-row w-full px-5">
                <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-col py-10 gap-4">
                        <div className="flex-center text-3xl text-sub-black tracking-[.25em] tb:tracking-[.4em]">
                            주문배송
                        </div>
                        {orderHistory}
                        <div className="w-full">
                            {signUpType === "email" && (
                                <AccordionComponent
                                    title="비밀번호 변경"
                                    content={<ResetPasswordFrom />}
                                    cat="AddRemoveAddress"
                                />
                            )}
                            <AccordionComponent
                                title="주소 추가 및 변경"
                                content={<AddressInfoFrom />}
                                cat="changePersonalInfo"
                            />
                            <div className="max-w-[100px]">
                                <LogOutButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
