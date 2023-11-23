"use client";

import { NavPcTop } from "@/app/components/nav-footer/component/nav-pc-top";
import Footer from "@/app/components/nav-footer/component/footer";
import Main from "./main";
import NavMobile from "@/app/components/nav-footer/component/nav-mobile";
import PageLoading from "@/app/components/loading/page-loading";
import useMobile from "@/app/components/hook/use-mobile";

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
    const { isMobile } = useMobile();
    if (isMobile === undefined) return <PageLoading />;
    return (
        <>
            <div className="main-container">
                {isMobile ? <NavMobile /> : <NavPcTopForAboutUs />}
                <div className="grow flex-col flex justify-between">
                    <Main />
                    <Footer />
                </div>
            </div>
        </>
    );
}
