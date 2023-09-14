"use client";
import Image from "next/image";
import Navigation from "./components/navbar";
import Footer from "./components/footer";
import EmblaCarousel from "./carousel/EmblaCarousel";
import BrandList from "./components/main/brand-list";
import SideBar from "./components/navbar/left-side-bar";

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
        <main className="flex flex-col">
            <Navigation />
            <EmblaCarousel thumbnailInfos={thumbnailInfos} />
            <div className="p-4"></div>
            <BrandList />
            <div className="p-5"></div>
            <Footer />
        </main>
    );
}
