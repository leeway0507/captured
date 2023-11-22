import Banner from "../components/main/main-banner";
import BrandList from "../components/main/brand-list";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/nav-footer/component/footer";
import { BottomNavBar } from "../components/nav-footer/bottom-nav-bar";

export default function page() {
    const thumbnailInfos = [
        {
            src: "/product/nike/jacquemus force black DR0424-001/thumbnail.png",
            brand: "nike",
            productName: "jacquemus force black",
            href: "/product/1",
        },
        // {
        //     src: "/product/adidas originals/tobacco pantone mesa gy7396/thumbnail.png",
        //     brand: "adidas originals",
        //     productName: "tobacco pantone mesa",
        //     href: "/product/2",
        // },
        // {
        //     src: "/product/adidas originals/handball spezial black db3021/thumbnail.png",
        //     brand: "adidas originals",
        //     productName: "handball spezial black",
        //     href: "/product/3",
        // },
    ];

    return (
        <>
            <Banner thumbnailInfos={thumbnailInfos} />
            <div className="pt-8"></div>
            <BrandList />
            <div className="pt-8"></div>
            <Footer />
            <BottomNavBar nav="home" />
        </>
    );
}
