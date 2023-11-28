import ResetPassword from "./main";
import Footer from "@/app/components/nav-footer/component/footer";

export default function Page() {
    return (
        <>
            <ResetPassword />;
            <div className="hidden tb:block">
                <Footer />
            </div>
        </>
    );
}
