import Logo from "@/app/components/nav-footer/component/logo";
import ServicePolicy from "./service-policy";
export default function page() {
    return (
        <>
            <div className="flex-center py-8 ">
                <Logo />
            </div>
            <div className="max-w-5xl w-full m-auto px-4 py-8 tb:py-16 text-sm text-justify">
                <ServicePolicy />
            </div>
        </>
    );
}
