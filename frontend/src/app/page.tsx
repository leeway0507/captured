import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import Banner from "./components/main/main-banner";
import BrandList from "./components/main/brand-list";

export default function Home() {
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
        <NavFooter>
            <Banner thumbnailInfos={thumbnailInfos} />
            <div className="py-4"></div>
            <div>
                <BrandList />
            </div>
            <div className="py-5"></div>
        </NavFooter>
    );
}