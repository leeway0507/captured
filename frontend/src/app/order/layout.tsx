import ContextWrapper from "../components/context/context-wrapper";
import Footer from "../components/nav-footer/component/footer";

export default function OrderLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContextWrapper>
            <div className="main-container">
                <div className="grow flex-col flex tb:px-4 xl:px-6">{children}</div>
                <Footer />
            </div>
        </ContextWrapper>
    );
}
