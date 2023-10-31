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
            if (scroll === 0) {
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
                <div className="min-h-[80px] max-h-[180px] w-full m-auto ">
                    <div className="flex h-full">
                        <div className="flex flex-col w-full h-full ">
                            <div className="h-[80px] bg-white px-8 tb:px-12 xl:px-16 ">
                                <NavPcTop />
                            </div>
                            <input type="checkbox" id="nav" checked={checked} />
                            <div className=" do not remove this div">
                                <div className="flex w-full overflow-hidden bg-white px-8">
                                    <div className="basis-3/12 flex-left ">
                                        <SearchBar search={search} setSearch={setSearch} />
                                    </div>
                                    <div className="basis-6/12 flex-center h-[100px]">
                                        <Logo />
                                    </div>
                                    <div className="basis-3/12 flex-right ">
                                        <UserDropDown />
                                        <CartBtn />
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
