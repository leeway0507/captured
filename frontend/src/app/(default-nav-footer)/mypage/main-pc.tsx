"use client";
import { Tab } from "@headlessui/react";
import ResetPasswordFrom from "./component/reset-password-form";
import AddressInfo from "./component/address-info";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { ConfirmPopUpModal } from "../../components/modal/new-yes-no-modal";
import SnsUserInfo from "./component/order/sns-user-info";

const selectedClass = "mx-4 bg-main-black text-white rounded-lg";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export const LogOutButton = () => {
    const callback = () => {
        signOut({ callbackUrl: "/" });
    };

    const handler = ConfirmPopUpModal("로그아웃", <div className="py-4">로그아웃 하시겠습니까?</div>, callback);
    return (
        <button onClick={handler} className="link-animation py-3">
            로그아웃
        </button>
    );
};

export default function MainPc({ signUpType, orderHistory }: { signUpType: string; orderHistory: JSX.Element }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const key = searchParams?.get("key");
    const [selectedIndex, setSelectedIndex] = useState(Number(key));

    return (
        <div className="mx-auto flex grow max-w-[1440px] justify-between">
            <Tab.Group vertical selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="basis-1/3 max-w-[300px] min-h-[600px] text-xl">
                    <Tab.List className={"sticky top-[70px] flex flex-col w-full"}>
                        <Tab
                            onClick={(e) => router.replace("/mypage?key=0")}
                            key="order"
                            className={({ selected }) =>
                                classNames(
                                    "py-4 tracking-[0.1em] cursor-pointer focus:outline-none",
                                    selected && selectedClass
                                )
                            }>
                            주문배송
                        </Tab>
                        <Tab
                            onClick={() => router.replace("/mypage?key=1")}
                            key="setAddress"
                            className={({ selected }) =>
                                classNames(
                                    "py-4 tracking-[0.1em] cursor-pointer focus:outline-none",
                                    selected && selectedClass
                                )
                            }>
                            주소 추가 및 변경
                        </Tab>
                        {signUpType === "email" ? (
                            <Tab
                                onClick={() => router.replace("/mypage?key=2")}
                                key="resetPassword"
                                className={({ selected }) =>
                                    classNames(
                                        "py-4 tracking-[0.1em] cursor-pointer focus:outline-none",
                                        selected && selectedClass
                                    )
                                }>
                                비밀번호 변경
                            </Tab>
                        ) : (
                            <Tab
                                onClick={() => router.replace("/mypage?key=2")}
                                key="resetPassword"
                                className={({ selected }) =>
                                    classNames(
                                        "py-4 tracking-[0.1em] cursor-pointer focus:outline-none",
                                        selected && selectedClass
                                    )
                                }>
                                가입정보 확인
                            </Tab>
                        )}
                        <LogOutButton />
                    </Tab.List>
                </Tab.List>
                <Tab.Panels className="flex flex-col basis-2/3 px-4 my-4 ">
                    <Tab.Panel key="order" className="grow">
                        <div className="text-3xl flex-center h-[100px] bg-white z-30 tracking-[0.2rem]">주문배송</div>
                        {orderHistory}
                    </Tab.Panel>
                    <Tab.Panel key="setAddress" className="grow">
                        <div className="text-3xl flex-center h-[100px] bg-white z-30 tracking-[0.2rem]">
                            주소 추가 및 변경
                        </div>
                        <div className="py-2">
                            <AddressInfo />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel key="resetPassword" className="grow">
                        <div className="text-3xl flex-center h-[100px] bg-white z-30 tracking-[0.2rem]">
                            가입정보 확인
                        </div>
                        <div className="py-2">
                            <SnsUserInfo />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel key="logout" className="grow">
                        <div></div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
