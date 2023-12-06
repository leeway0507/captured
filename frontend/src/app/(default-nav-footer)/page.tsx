import Banner from "../components/main/main-banner";
import BrandList from "../components/main/brand-list";
import NewestItem from "../components/main/newest-item";
import Footer from "../components/nav-footer/component/footer";
import { BottomNavBar } from "../components/nav-footer/component/bottom-nav-bar";
import CategoryList from "../components/main/category-list";

export default async function page() {
    const thumbnailInfos = [
        {
            src: "/banner/new_balance.jpg",
            linkName: "new balance",
            href: "/category/brand?brand=adidas%20originals",
        },
        {
            src: "/banner/main1.jpeg",
            linkName: "spezial",
            href: "/category/brand?brand=adidas%20originals",
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
