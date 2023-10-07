"use client";
import Main from "./main";
import ContextWrapper from "../components/context/context-wrapper";
import Footer from "../components/nav-footer/component/footer";
export default function Page() {
    return (
        <ContextWrapper>
            <div className="custom-container">
                <div className="grow">
                    <Main />
                </div>
                <Footer />
            </div>
        </ContextWrapper>
    );
}
