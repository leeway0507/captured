import Banner from "../components/main/main-banner";
import BrandList from "../components/main/brand-list";
import NewestItem from "../components/main/newest-item";
import Footer from "../components/nav-footer/component/footer";
import { BottomNavBar } from "../components/nav-footer/component/bottom-nav-bar";
import CategoryList from "../components/main/category-list";
import metaJson from "../../../public/banner/thumbnail.json";

export default async function page() {
    const meta = process.env.NEXT_PUBLIC_THUMBNAIL_URL?.includes("banner")
        ? metaJson
        : await fetch(`${process.env.NEXT_PUBLIC_THUMBNAIL_URL}/thumbnail.json`).then((res) => res.json());
    return (
        <>
            <Banner meta={meta} />
            <div className="main-frame">
                <NewestItem />
                <div className="pt-16" />
                <BrandList />
                <div className="pt-16" />
                <CategoryList />
                <div className="pt-16" />
            </div>
            <Footer />
            <BottomNavBar nav="home" />
        </>
    );
}
