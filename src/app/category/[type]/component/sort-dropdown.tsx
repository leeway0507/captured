"use client";

import { useState } from "react";
import "./filter.css";
import Image from "next/image";

export default function SortItem() {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [arrow, setArrow] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("추천순");

    const sortList = ["추천순", "낮은 가격 순", "높은 가격 순"];

    const openToggle = () => {
        setIsActive(!isActive);
        setArrow(!arrow);
    };

    return (
        <div className="mondaL relative w-[150px] cursor-pointer z-50">
            <div onClick={openToggle} className="ps-2">
                <div className="flex-right  tracking-wide">
                    {selected}
                    <Image
                        src="/icons/expand.svg"
                        width={24}
                        height={0}
                        alt={"filter"}
                        className={`${arrow ? "rotateArrow" : ""}`}
                    />
                </div>
            </div>
            {isActive && (
                <div className="mondaL absolute flex-center flex-col w-full bg-white shadow-xl border rounded z-50">
                    {sortList.map((item, index) => (
                        <div
                            key={index}
                            className="flex-center w-full h-full p-2 text-sm-base hover:bg-light-gray"
                            onClick={() => {
                                setIsActive(false);
                                setSelected(item);
                            }}>
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
