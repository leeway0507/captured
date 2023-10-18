import Footer from "../component/footer";
import NavMain from "../component/nav-main";
import ContextWrapper from "../../context/context-wrapper";

interface NavFooterProps {
    children: React.ReactNode;
}

export default function NavFooter({ children }: NavFooterProps) {
    return (
        <ContextWrapper>
            <main className="flex flex-col w-full h-full min-h-screen relative">
                <div className="sticky top-0 z-50">
                    <NavMain />
                </div>
                <div className="grow flex flex-col justify-between w-full" id="main-body">
                    {children}
                    <Footer />
                </div>
            </main>
        </ContextWrapper>
    );
}
