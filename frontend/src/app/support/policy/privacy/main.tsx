import Logo from "@/app/components/nav-footer/component/logo";
import PrivacyPolicy from "./privacy-policy";
export default function Main() {
    return (
        <>
            <div className="flex-center py-8 ">
                <Logo />
            </div>
            <div className="max-w-5xl w-full m-auto px-4 py-8 tb:py-16 text-sm text-justify">
                <PrivacyPolicy />
            </div>
        </>
    );
}
