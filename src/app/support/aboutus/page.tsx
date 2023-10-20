"use client";

import { NavPcTop } from "@/app/components/nav-footer/component/nav-pc-top";
import Footer from "@/app/components/nav-footer/component/footer";
import Main from "./main";
import NavMobile from "@/app/components/nav-footer/component/nav-mobile";
import PageLoading from "@/app/components/loading/page-loading";
import { useState, useEffect } from "react";

function NavPcTopForAboutUs() {
    return (
        <div className="sticky top-0 h-[50px] bg-white px-8 tb:px-12 xl:px-16 z-50">
            <div className="h-full">
                <NavPcTop />
            </div>
        </div>
    );
}

export default function Page() {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= Number(process.env.NEXT_PUBLIC_MOBILE_WIDTH));
        };
        window.addEventListener("resize", handleResize);
        setIsMobile(window.innerWidth <= Number(process.env.NEXT_PUBLIC_MOBILE_WIDTH));
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile === undefined) return <PageLoading />;

    return (
        <>
            {isMobile ? <NavMobile /> : <NavPcTopForAboutUs />}
            <div className="custom-container h-full">
                <div className="grow flex-col flex justify-between">
                    <Main />
                    <Footer />
                </div>
            </div>
        </>
    );
}
