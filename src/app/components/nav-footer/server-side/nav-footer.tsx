import Nav from "./nav-server-side";
import Footer from "../component/footer";

interface NavFooterProps {
    children: React.ReactNode;
}

export default function NavFooterServerSide({ children }: NavFooterProps) {
    return (
        <main className="custom-container">
            <Nav />
            <div className="grow">{children}</div>
            <Footer />
        </main>
    );
}
