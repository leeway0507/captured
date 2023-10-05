"use client";
import Main from "./main";
import ContextWrapper from "../components/context/context-wrapper";
export default function Page() {
    return (
        <ContextWrapper>
            <Main />;
        </ContextWrapper>
    );
}
