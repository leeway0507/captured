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
            <main className="custom-container">
                <NavMain />
                <div className="grow">{children}</div>
                <Footer />
            </main>
        </ContextWrapper>
    );
}
