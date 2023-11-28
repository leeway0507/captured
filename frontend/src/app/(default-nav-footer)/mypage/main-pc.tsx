"use client";
import { Tab } from "@headlessui/react";
import ResetPasswordFrom from "./component/reset-password-form";
import AddressInfo from "./component/address-info";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { ConfirmPopUpModal } from "../../components/modal/new-yes-no-modal";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export const LogOutButton = () => {
    const url = window.location.origin;
    const callback = () => {
        signOut({ callbackUrl: url });
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

    const [selectedIndex, setSelectedIndex] = useState(0);

    const pageIdx = searchParams?.get("pageindex");
    useEffect(() => {
        if (pageIdx) {
            setSelectedIndex(parseInt(pageIdx));
        }
    }, [pageIdx]);

    return (
        <div className="flex grow max-w-5xl mx-auto justify-between">
            <Tab.Group vertical selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="basis-1/3 border-e max-w-[300px] my-4">
                    <Tab.List className={"flex flex-col min-h-[600px] text-xl sticky top-0 py-2"}>
                        <Tab
                            onClick={() => router.push("/mypage?pageindex=0")}
                            key="order"
                            className={({ selected }) =>
                                classNames(
                                    "py-4 tracking-[0.1em] cursor-pointer focus:outline-none",
                                    selected ? "bg-main-black text-white" : ""
                                )
                            }>
                            주문배송
                        </Tab>
                        <Tab
                            onClick={() => router.push("/mypage?pageindex=1")}
                            key="setAddress"
                            className={({ selected }) =>
                                classNames(
                                    "py-4 tracking-[0.1em] cursor-pointer focus:outline-none",
                                    selected ? "bg-main-black text-white" : ""
                                )
                            }>
                            주소 추가 및 변경
                        </Tab>
                        {signUpType === "email" && (
                            <Tab
                                onClick={() => router.push("/mypage?pageindex=2")}
                                key="resetPassword"
                                className={({ selected }) =>
                                    classNames(
                                        "py-4 tracking-[0.1em] cursor-pointer focus:outline-none",
                                        selected ? "bg-main-black text-white" : ""
                                    )
                                }>
                                비밀번호 변경
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
                            비밀번호 변경
                        </div>
                        <div className="py-2">
                            <ResetPasswordFrom />
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
