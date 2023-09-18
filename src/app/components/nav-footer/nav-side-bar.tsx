"use clientt";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "../../shopping-cart-context";

export default function NavMobile({ isOpen, setIsOpen }) {
    const barRef = useRef(null);
    const { setSearch } = useShoppingCart();

    useEffect(() => {
        const handler = (event) => {
            if (!barRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [barRef, setIsOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // "API : search query"

    return (
        <>
            <div
                className={`mondaL fixed bottom-0 left-0 z-40 w-full h-[90%] ${
                    isOpen ? "side-bar-visible" : "side-bar-hidden"
                }`}>
                <div className="fixed w-screen h-full top-0 left-0 bg-main-black opacity-50"></div>
                <div className="fixed z-50 flex flex-row text-sub-black w-screen h-screen">
                    <div className="flex flex-col basis-9/12 tb:basis-7/12 bg-white " ref={barRef}>
                        <div className="flex flex-col h-full text-base-lg">
                            <div className="bg-light-gray flex-center py-4">
                                <input
                                    type="text"
                                    className="text-base-lg mx-5 bg-light-gray mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-sub-black"
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    placeholder="검색하기"
                                />
                            </div>
                            <div className="flex flex-col basis-5/12 justify-between py-6 text-lg-xl">
                                <Link href="/cat/all" className="ps-6 basis-1/5 flex-left hover:bg-light-gray">
                                    LATEST
                                </Link>
                                <Link href="/brands" className="ps-6 basis-1/5 flex-left hover:bg-light-gray">
                                    BRANDS
                                </Link>
                                <Link href="/cat/shoes" className="ps-6 basis-1/5 flex-left hover:bg-light-gray">
                                    SHOES
                                </Link>
                                <Link href="/cat/clothing" className="ps-6 basis-1/5 flex-left hover:bg-light-gray">
                                    CLOTHING
                                </Link>
                                <Link href="/cat/accessory" className="ps-6 basis-1/5 flex-left hover:bg-light-gray">
                                    ACCESSORY
                                </Link>
                            </div>
                            <div className="bg-light-gray flex-center justify-between px-3 text-sm-base basis-1/12">
                                <Link href="/mypage">마이페이지</Link>
                                <Link href="/login">로그인/회원가입</Link>
                                <Link href="/logout">로그아웃</Link>
                            </div>

                            <div className="flex flex-col py-3 justify-between px-2 border-b-2">
                                <a href={process.env.INSTARGRAM_URL} className="hover:bg-light-gray">
                                    <div className="flex-left py-1">
                                        <div className="basis-1/12 flex-center ">
                                            <Image src="/icons/instagram.svg" width={16} height={16} alt="instagram" />
                                        </div>
                                        <div className="ms-1">인스타그램</div>
                                    </div>
                                </a>
                                <a href={process.env.CUSTOM_ID_URL} className="hover:bg-light-gray">
                                    <div className="flex-left py-1">
                                        <div className="basis-1/12 flex-center">
                                            <Image src="/icons/approval.svg" width={20} height={20} alt="instagram" />
                                        </div>
                                        <div className="ms-1">개인통관부호</div>
                                    </div>
                                </a>
                                <div className="py-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
