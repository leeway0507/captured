import Footer from "../component/footer";
import NavMain from "../component/nav-main";
import ContextWrapper from "../../context/context-wrapper";

interface NavFooterProps {
    children: React.ReactNode;
}

export default function NavFooter({ children }: NavFooterProps) {
    return (
        <ContextWrapper>
            <main className="main-container">
                <div className="sticky top-0 z-50">
                    <NavMain />
                </div>
                <div className="grow flex flex-col justify-between w-full tb:px-8 xl:px-12" id="main-body">
                    {children}
                </div>
                <Footer />
            </main>
        </ContextWrapper>
    );
}
