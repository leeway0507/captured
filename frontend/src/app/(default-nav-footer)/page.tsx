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
            linkName: "jacquemus force black",
            href: "/product/3",
        },
        {
            src: "/banner/main1.jpeg",
            linkName: "jacquemus force black",
            href: "/product/3",
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
