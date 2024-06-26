import ThirdPartyPolicy from "./third-party-policy";
import Logo from "@/app/components/nav-footer/component/logo";
export default function page() {
    return (
        <>
            <div className="flex-center pt-8">
                <Logo />
            </div>
            <div className="flex-center mx-auto max-w-5xl w-full flex-col px-4 py-8 tb:py-16 text-sm text-justify">
                <div className="text-2xl font-bold pb-4"> 개인정보 제3자 제공 동의</div>
                <ThirdPartyPolicy />
            </div>
        </>
    );
}
