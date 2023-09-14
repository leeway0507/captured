"use client";
import Image from "next/image";
import LeftSideBar from "./navbar/left-side-bar";
import RightSideBar from "./navbar/right-side-bar";

import { useState } from "react";
export default function Navigation() {
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const leftToggleSidebar = () => {
        setLeftSidebarOpen(!leftSidebarOpen);
    };
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const rightToggleSidebar = () => {
        setRightSidebarOpen(!rightSidebarOpen);
    };
    return (
        <header className="relative sticky bg-white left-0 top-0 flex flex-row p-4 justify-between shadow-sm shadow-gray-200 z-50 w-100">
            <LeftSideBar isOpen={leftSidebarOpen} setIsOpen={setLeftSidebarOpen} setSideBar={leftToggleSidebar} />
            <RightSideBar isOpen={rightSidebarOpen} setIsOpen={setRightSidebarOpen} setSideBar={rightToggleSidebar} />
            <div className="flex basis-1/12">
                <Image
                    src="/icons/list.svg"
                    alt="list"
                    className=""
                    width={40}
                    height={40}
                    layout="responsive"
                    onClick={leftToggleSidebar}
                />
            </div>
            <div className="flex justify-center basis-5/12">
                <Image
                    src="/icons/main-logo.svg"
                    alt="main logo"
                    className=""
                    width={120}
                    height={36}
                    layout="responsive"
                />
            </div>
            <div className="flex justify-end items-center basis-1/12">
                <Image
                    src="/icons/shopping-cart.svg"
                    alt="shopping cart"
                    className=""
                    width={24}
                    height={24}
                    layout="responsive"
                    onClick={rightToggleSidebar}
                />
                <div className="text-sm ps-1">1</div>
            </div>
        </header>
    );
}
