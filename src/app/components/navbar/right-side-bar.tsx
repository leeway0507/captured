"use clientt";
import React, { useEffect, useRef } from "react";

export default function LeftSideBar({ isOpen, setIsOpen, setSideBar }) {
    const barRef = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            if (!barRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [barRef, setIsOpen]);

    return (
        <>
            <aside
                id="sidebar-multi-level-sidebar"
                className={`absolute top-0 left-0 z-40 w-full h-screen ${
                    isOpen ? "side-bar-visible" : "side-bar-hidden"
                }`}
                aria-label="Sidebar">
                <div className="flex flex-row">
                    <div className="basis-3/12 tb:basis-5/12 h-screen bg-main-black opacity-50">asd</div>
                    <div
                        className="flex flex-col basis-9/12 tb:basis-7/12 h-screen overflow-y-auto bg-white shadow-lg"
                        ref={barRef}>
                        <div className="flex items-center justify-between p-4">
                            <h2 className="text-xl font-medium text-gray-800">Sidebar</h2>
                            <button
                                className="p-1 text-gray-800 rounded-md hover:bg-gray-200 focus:outline-none focus:ring"
                                onClick={setSideBar}
                                aria-label="Close sidebar">
                                button
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ...rest of your component */}
        </>
    );
}
