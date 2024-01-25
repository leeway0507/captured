import BaseModal from "../modal/new-modal";
import NavMain from "./component/nav-main";
import ContextWrapper from ".././context/context-wrapper";

interface NavFooterProps {
    children: React.ReactNode;
}

export default function NavFooter({ children }: NavFooterProps) {
    return (
        <ContextWrapper>
            <main className="main-container min-h-s-screen">
                <div className="sticky top-0 z-50">
                    <NavMain />
                </div>
                <div
                    className="mx-auto grow flex flex-col justify-between w-full tb:pt-[80px] max-w-[1440px]"
                    id="main-body">
                    {children}
                </div>
                <BaseModal />
            </main>
        </ContextWrapper>
    );
}
