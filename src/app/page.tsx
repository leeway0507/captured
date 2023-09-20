"use client";
import NavFooter from "./components/nav-footer/nav-footer";
import Banner from "./components/main/main-banner";
import BrandList from "./components/main/brand-list";

export default function Home() {
    const thumbnailInfos = [
        {
            src: "/test.png",
            brand: "brand",
            productName: "productName",
            href: "/mypage",
        },
        {
            src: "/test.png",
            brand: "brand",
            productName: "productName",
            href: "/mypage",
        },
    ];

    return (
        <NavFooter>
            <Banner thumbnailInfos={thumbnailInfos} />
            <div className="p-4"></div>
            <BrandList />
            <div className="p-5"></div>
        </NavFooter>
    );
}
