"use client";
import Footer from "../component/footer";
import NavMain from "../component/nav-main";
import ContextWrapper from "../../context/context-wrapper";

interface NavFooterProps {
    children: React.ReactNode;
}

export default function NavFooter({ children }: NavFooterProps) {
    return (
        <ContextWrapper>
            <main className="custom-container h-screen xl:mx-4">
                <NavMain />
                <div className="grow flex flex-col justify-between overflow-scroll w-full" id="main-body">
                    {children}
                    <Footer />
                </div>
            </main>
        </ContextWrapper>
    );
}
