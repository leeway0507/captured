import CreateAccount from "./main";
import Footer from "@/app/components/nav-footer/component/footer";
export default function Page() {
    return (
        <>
            <CreateAccount />
            <div className="hidden tb:block">
                <Footer />
            </div>
        </>
    );
}
