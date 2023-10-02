"use client";
import NavFooter from "./components/nav-footer/nav-footer";
import Banner from "./components/main/main-banner";
import BrandList from "./components/main/brand-list";
import { useSession } from "next-auth/react";
// import LoginAlertModal from "./components/modal/login-alert-modal-without-btn";
import { useEffect, useState } from "react";

export default function Home() {
    const thumbnailInfos = [
        {
            src: "/product/nike/jacquemus force black DR0424-001/thumbnail.png",
            brand: "nike",
            productName: "jacquemus force black",
            href: "/product/1",
        },
        {
            src: "/product/adidas originals/tobacco pantone mesa gy7396/thumbnail.png",
            brand: "adidas originals",
            productName: "tobacco pantone mesa",
            href: "/product/2",
        },
        {
            src: "/product/adidas originals/handball spezial black db3021/thumbnail.png",
            brand: "adidas originals",
            productName: "handball spezial black",
            href: "/product/3",
        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();
    useEffect(() => {
        if (!session) {
            setIsOpen(true);
        }
    }, []);

    return (
        <NavFooter>
            <Banner thumbnailInfos={thumbnailInfos} />
            <div className="p-4"></div>
            <div className="mx-2">
                <BrandList />
            </div>
            <div className="p-5"></div>
        </NavFooter>
    );
}
