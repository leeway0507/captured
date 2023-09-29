"use client";
import NavFooter from "./components/nav-footer/nav-footer";
import Banner from "./components/main/main-banner";
import BrandList from "./components/main/brand-list";

export default function Home() {
    const thumbnailInfos = [
        {
            src: "/test.png",
            brand: "Adidas Originals",
            productName: "Handball Spezial Black",
            href: "/mypage",
        },
        // {
        //     src: "/test.png",
        //     brand: "Adidas Originals",
        //     productName: "Spezail Core Black",
        //     href: "/mypage",
        // },
    ];

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
