import BaseModal from "../modal/new-modal";
import NavMain from "./component/nav-main";
import ContextWrapper from ".././context/context-wrapper";

interface NavFooterProps {
    children: React.ReactNode;
}

export default function NavFooter({ children }: NavFooterProps) {
    return (
        <ContextWrapper>
            <main className="main-container min-h-s-screen relative">
                <div className="sticky top-0 z-50">
                    <NavMain />
                </div>
                <div className="grow flex flex-col justify-between w-full tb:px-4 xl:px-6 tb:tb:pt-24" id="main-body">
                    {children}
                </div>
                <BaseModal />
            </main>
        </ContextWrapper>
    );
}