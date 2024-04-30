import ContextWrapper from "../../components/context/context-wrapper";
import BaseModal from "@/app/components/modal/new-modal";

export default function OrderLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContextWrapper>
            <div className="main-frame">
                <div className="grow flex-col flex tb:px-4 xl:px-6">{children}</div>
            </div>
            <BaseModal />
        </ContextWrapper>
    );
}
