import React from 'react';
import Banner from "../components/main/main-bannertwo";
import BrandList from "../components/main/brand-list";
import NewestItem from "../components/main/newest-item";
import Footer from "../components/nav-footer/component/footer";
import { BottomNavBar } from "../components/nav-footer/component/bottom-nav-bar";
import BrandItemsLayOutTop from "../components/main/brand-items-layout-reverse";
import metaJson from "../../../public/banner/thumbnail.json";
import BrandItemsLayOut from "../components/main/brand-items-layout";
import ThreeItemsLayOut from "../components/main/three-items-layout";
import FourItemsLayout from "../components/main/four-items-layout";

export default async function page() {
    return (
        <>
            <Banner />
            <NewestItem />
            <div className="my-4 tb:my-16 border-b border-deep-gray " />
            <FourItemsLayout />
            <div className="my-4 tb:my-16 border-b border-deep-gray " />
            <BrandItemsLayOut brandName="adidas originals" />
            <div className="my-4 tb:my-16 border-b border-deep-gray " />
            <ThreeItemsLayOut />
            <div className="my-4 tb:my-16 border-b border-deep-gray " />
            <BrandList />
            <div className="my-4 tb:my-16 border-b border-deep-gray " />
            <BrandItemsLayOut brandName="vivienne westwood" />
            <div className="my-4 tb:my-16 border-b border-deep-gray " />
            <BrandItemsLayOutTop brandName="patagonia" />
            <div className="my-4 tb:my-16 border-b border-deep-gray " />
            <Footer />
            <BottomNavBar nav="home" />
        </>
    );
}
