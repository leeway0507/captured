import { NavPcTop } from "@/app/components/nav-footer/component/nav-pc-top";
import Footer from "@/app/components/nav-footer/component/footer";
import Main from "./main";

function NavPcTopForAboutUs() {
    return (
        <div className="sticky top-0 h-[50px] bg-white px-8 tb:px-12 xl:px-16 z-50">
            <div className="h-full">
                <NavPcTop />
            </div>
        </div>
    );
}

export default async function Page() {
    return (
        <>
            <div className="main-frame">
                <div className="hidden tb:display">
                    <NavPcTopForAboutUs />
                </div>
                <div className="grow flex-col flex justify-between">
                    <Main />
                    <Footer />
                </div>
            </div>
        </>
    );
}
