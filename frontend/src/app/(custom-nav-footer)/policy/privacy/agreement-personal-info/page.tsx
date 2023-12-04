import PersonalInfo from "./agreement-personal-info";
import Logo from "@/app/components/nav-footer/component/logo";
export default function page() {
    return (
        <>
            <div className="flex-center py-8 ">
                <Logo />
            </div>
            <div className="max-w-5xl w-full m-auto px-4 py-8 tb:py-16 text-sm text-justify">
                <div className="text-2xl font-bold">개인정보 수집 및 이용 동의</div>
                <PersonalInfo />
            </div>
        </>
    );
}
