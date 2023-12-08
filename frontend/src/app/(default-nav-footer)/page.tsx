import Banner from "../components/main/main-banner";
import BrandList from "../components/main/brand-list";
import NewestItem from "../components/main/newest-item";
import Footer from "../components/nav-footer/component/footer";
import { BottomNavBar } from "../components/nav-footer/component/bottom-nav-bar";
import CategoryList from "../components/main/category-list";

export default async function page() {
    const thumbnailInfos = [
        {
            src: "/banner/adidas_originals.png",
            linkName: "spezial",
            href: "/category/brand?brand=adidas%20originals",
        },
        {
            src: "/banner/arcteryx.png",
            linkName: "new balance",
            href: "/category/brand?brand=arc%27teryx",
        },
        {
            src: "/banner/patagonia.png",
            linkName: "spezial",
            href: "/category/brand?brand=patagonia",
        },
    ];

    return (
        <>
            <Banner thumbnailInfos={thumbnailInfos} />
            <div className="pt-16"></div>
            <NewestItem />
            <div className="pt-16"></div>
            <BrandList />
            <div className="pt-16"></div>
            <CategoryList />
            <div className="pt-16"></div>
            <Footer />
            <BottomNavBar nav="home" />
        </>
    );
}
