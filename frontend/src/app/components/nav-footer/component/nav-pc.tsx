import UserDropDown from "./user-dropdown";
import CartBtn from "./cart-btn";
import Logo from "./logo";
import { SearchBar } from "./mobile-sidebar-components";
import { useEffect, useState } from "react";
import { NavPcTop } from "./nav-pc-top";

export default function NavPc() {
    const [search, setSearch] = useState("");
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            if (document.getElementById("nav") == null) return null;
            const scroll = window.scrollY;
            if (scroll < 20) {
                return setChecked(true);
            }
            if (scroll > 100) {
                setChecked(false);
            }
        };

        // add event listener to window
        window.addEventListener("scroll", onScroll, { passive: true });

        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <header>
                <div className="min-h-[60px] max-h-[160px] w-full m-auto relative ">
                    <div className="flex h-full">
                        <div className="flex flex-col w-full h-full bg-white ">
                            <div className="h-[60px] px-8 tb:px-12 xl:px-16 flex-center">
                                <NavPcTop />
                            </div>
                            <div className="absolute top-[60px] w-full border-b shadow-sm">
                                <input type="checkbox" id="nav" checked={checked} readOnly />
                                <div className=" do not remove this div">
                                    <div className="grid grid-cols-5 text-center w-full overflow-hidden bg-white px-12 xl:px-16">
                                        <div className="col-span-1 flex-center ">
                                            <SearchBar search={search} setSearch={setSearch} />
                                        </div>
                                        <div className="col-span-3 flex-center h-[100px]">
                                            <Logo />
                                        </div>
                                        <div className="col-span-1 flex-right ">
                                            <UserDropDown />
                                            <CartBtn />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
