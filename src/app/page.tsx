"use client";
import NavFooter from "./components/nav-footer/nav-footer";
import EmblaCarousel from "./carousel/EmblaCarousel";
import BrandList from "./components/main/brand-list";

export default function Home() {
    const thumbnailInfos = [
        {
            src: "/test.png",
            brand: "brand",
            productName: "productName",
            href: "href",
        },
    ];

    return (
        <NavFooter>
            <EmblaCarousel thumbnailInfos={thumbnailInfos} />
            <div className="p-4"></div>
            <BrandList />
            <div className="p-5"></div>
        </NavFooter>
    );
}
