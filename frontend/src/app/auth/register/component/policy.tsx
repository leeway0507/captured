"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PolicyComponent from "./policy-component";
import PersonalInfo from "@/app/support/policy/privacy/agreement-personal-info/agreement-personal-info";
import ServicePolicy from "@/app/support/policy/service/service-policy";
import ThirdPartyPolicy from "@/app/support/policy/privacy/agreement-third-party/third-party-policy";
import { useSearchParams } from "next/navigation";

// "privacy-policy","service-policy","thirdParty-policy"
const Policy = ({ checkAllSelect }: { checkAllSelect: (e: boolean) => void }) => {
    const searchParams = useSearchParams();

    const [checkState, setCheckState] = useState([
        { id: "privacy-policy", checked: true },
        { id: "service-policy", checked: true },
        { id: "third-party-policy", checked: true },
        { id: "age", checked: true },
    ]);
    const [openRegistration, setOpenRegistration] = useState(true);
    const [privacypolicy, setPrivacypolicy] = useState(false);
    const [servicePolicy, setServicePolicy] = useState(false);
    const [thirdPartyPolicy, setThirdPartyPolicy] = useState(false);

    useEffect(() => {
        if (checkState.every((item) => item.checked)) {
            return checkAllSelect(true);
        }
        return checkAllSelect(false);
    }, [checkState, checkAllSelect]);

    const router = useRouter();

    useEffect(() => {
        if (searchParams.get("policy") === null) {
            setOpenRegistration(true);
            setPrivacypolicy(false);
            setServicePolicy(false);
            setThirdPartyPolicy(false);
        }
    }, [searchParams]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        if (id === "agree-all") {
            return setCheckState([
                { id: "privacy-policy", checked },
                { id: "service-policy", checked },
                { id: "third-party-policy", checked },
                { id: "age", checked },
            ]);
        }
        return setCheckState((state) => {
            const newState = state.map((item) => {
                if (item.id === id) {
                    return { ...item, checked: checked };
                }
                return item;
            });
            return newState;
        });
    };

    const openPrivacyPolicy = () => {
        router.push("/auth/register?policy=privacy");
        setPrivacypolicy(true);
        setOpenRegistration(false);
    };
    const openServicePolicy = () => {
        router.push("/auth/register?policy=service");
        setServicePolicy(true);
        setOpenRegistration(false);
    };
    const openThirdPartyPolicy = () => {
        router.push("/auth/register?policy=third-party");
        setThirdPartyPolicy(true);
        setOpenRegistration(false);
    };
    const closepPivacyPolicy = () => {
        router.push("/auth/register");
        setPrivacypolicy(false);
        setOpenRegistration(true);
    };
    const closeServicePoicy = () => {
        router.push("/auth/register");
        setServicePolicy(false);
        setOpenRegistration(true);
    };
    const closeThirdPartyPolicy = () => {
        router.push("/auth/register");
        setThirdPartyPolicy(false);
        setOpenRegistration(true);
    };

    return (
        <>
            {openRegistration && (
                <div className="flex flex-col gap-2 relative text-main-black">
                    <div className="flex items-center ">
                        <input
                            id="agree-all"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-sub-black bg-gray-100 border-gray-300 rounded focus:ring-main-black bg-white focus:ring-2"
                            onChange={changeHandler}
                            checked={checkState.every((item) => item.checked)}
                        />
                        <label htmlFor="agree-all" className="ml-2 text-sm ">
                            [필수] 서비스 이용 및 정보제공 동의
                        </label>
                    </div>

                    <input
                        type="checkbox"
                        id="show-terms"
                        className=" absolute top-0 left-[63%] peer text-sm py-2 px-4 border-transparent checked:rotate-90 focus:ring-0 checked:ring-0 checked:bg-transparent "
                    />
                    <label htmlFor="show-terms" className="absolute top-0 left-[65%] text-sm peer-checked:rotate-90 ">
                        ❯
                    </label>

                    <div className="hidden flex-col duration-1000 peer-checked:flex">
                        <div className="flex items-center">
                            <input
                                id="privacy-policy"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-sub-black bg-gray-100 border-gray-300 rounded focus:ring-main-black bg-white focus:ring-2"
                                onChange={changeHandler}
                                checked={checkState[0].checked}
                            />
                            <label
                                htmlFor="privacy-policy"
                                className="ml-2 text-sm text-gray-900 flex-center justify-between">
                                <div> 개인정보 수집·이용 동의</div>
                                <button
                                    onClick={openPrivacyPolicy}
                                    className="px-1 text-xs text-sub-black hover:underline">
                                    (약관보기)
                                </button>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="service-policy"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-sub-black bg-gray-100 border-gray-300 rounded focus:ring-main-black bg-white focus:ring-2"
                                onChange={changeHandler}
                                checked={checkState[1].checked}
                            />
                            <label
                                htmlFor="service-policy"
                                className="ml-2 text-sm text-gray-900 flex-center justify-between">
                                서비스 이용 약관 동의
                                <button
                                    onClick={openServicePolicy}
                                    className="px-1 text-xs text-sub-black hover:underline align-bottom	">
                                    (약관보기)
                                </button>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="third-party-policy"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-sub-black bg-gray-100 border-gray-300 rounded focus:ring-main-black bg-white focus:ring-2"
                                onChange={changeHandler}
                                checked={checkState[2].checked}
                            />
                            <label
                                htmlFor="third-party-policy"
                                className="ml-2 text-sm text-gray-900 flex-center justify-between">
                                개인정보 제3자 제공 동의
                                <button
                                    onClick={openThirdPartyPolicy}
                                    className="px-1 text-xs text-sub-black hover:underline align-middle">
                                    (약관보기)
                                </button>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="age"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-sub-black bg-gray-100 border-gray-300 rounded focus:ring-main-black bg-white focus:ring-2"
                            onChange={changeHandler}
                            checked={checkState[3].checked}
                        />
                        <label htmlFor="age" className="ml-2 text-sm text-gray-900 flex-center justify-between">
                            [필수] 만 14세 이상입니다.
                        </label>
                    </div>
                </div>
            )}
            {privacypolicy && (
                <PolicyComponent
                    policy={
                        <>
                            <div className="text-2xl py-2">개인정보 수집·이용 동의</div>
                            <PersonalInfo />
                        </>
                    }
                    setClosePolicy={closepPivacyPolicy}
                />
            )}
            {servicePolicy && <PolicyComponent policy={<ServicePolicy />} setClosePolicy={closeServicePoicy} />}
            {thirdPartyPolicy && (
                <PolicyComponent
                    policy={
                        <>
                            <div className="text-2xl py-2">개인정보 제3자 제공 동의</div>
                            <ThirdPartyPolicy />
                        </>
                    }
                    setClosePolicy={closeThirdPartyPolicy}
                />
            )}
        </>
    );
};

export default Policy;
