"use client";
import NavPc from "./nav-pc";
import NavMobile from "./nav-mobile";

export default function NavMain() {
    return (
        <>
            <div className="display tb:hidden">
                <NavMobile />
            </div>
            <div className="hidden tb:block">
                <NavPc />
            </div>
        </>
    );
}
