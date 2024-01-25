import BaseModal from "../modal/new-modal";
import NavMain from "./component/nav-main";
import ContextWrapper from ".././context/context-wrapper";

interface NavFooterProps {
    children: React.ReactNode;
}

export default function NavFooter({ children }: NavFooterProps) {
    return (
        <ContextWrapper>
            <main className="min-h-screen flex flex-col">
                <div className="sticky top-0 z-50">
                    <NavMain />
                </div>
                <div className="flex flex-col h-full grow tb:pt-[80px] justify-between" id="main-body">
                    {children}
                </div>
                <BaseModal />
            </main>
        </ContextWrapper>
    );
}
