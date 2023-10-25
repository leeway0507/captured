"use client";
import { Tab } from "@headlessui/react";
import ResetPasswordFrom from "./component/reset-password-form";
import AddressInfo from "./component/address-info";
import YesNoModal from "../components/modal/yes-no-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

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
        <div className="flex grow">
            <Tab.Group vertical selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="basis-1/3 border-e max-w-[350px] my-8">
                    <Tab.List className={"flex flex-col  text-xl sticky top-0 py-2"}>
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
                        <YesNoModal
                            toggleName={
                                <button className="py-4 w-full tracking-[0.1em] cursor-pointer focus:outline-none active:bg-main-black active:text-white ">
                                    로그아웃
                                </button>
                            }
                            title="로그아웃"
                            content="로그아웃 하시겠습니까?"
                            trueCallback={() => {
                                signOut({ callbackUrl: "/" });
                            }}
                        />
                    </Tab.List>
                </Tab.List>
                <Tab.Panels className="flex flex-col basis-2/3 px-4 my-4">
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
