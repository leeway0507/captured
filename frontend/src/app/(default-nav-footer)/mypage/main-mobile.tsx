"use client";
import AccordionComponent from "@/app/components/accordion/accordion";
import ResetPasswordFrom from "./component/reset-password-form";
import AddressInfoFrom from "./component/address-info";
import SnsUserInfo from "./component/order/sns-user-info";
import { LogOutButton } from "./main-pc";

export default function MobileMain({ signUpType, orderHistory }: { signUpType: string; orderHistory: JSX.Element }) {
    return (
        <>
            <div className="flex flex-col justify-between w-full px-5 py-10 gap-4">
                <div className="flex-center text-3xl text-sub-black tracking-[.25em] tb:tracking-[.4em]">주문배송</div>
                {orderHistory}
                <div className="w-full">
                    {signUpType === "email" ? (
                        <AccordionComponent
                            title="비밀번호 변경"
                            content={<ResetPasswordFrom />}
                            cat="AddRemoveAddress"
                        />
                    ) : (
                        <AccordionComponent title="가입정보 확인" content={<SnsUserInfo />} cat="userInfo" />
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
        </>
    );
}
