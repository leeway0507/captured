"use client";

import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { userAddressProps } from "../../type";
import { User } from "@/app/type";
import { redirect } from "next/navigation";
import useMobile from "@/app/components/hook/use-mobile";
import PageLoading from "@/app/components/loading/page-loading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cartProductCardProps } from "../../type";
import { AlertPopUpModal } from "@/app/components/modal/new-alert-modal";
import { useRouter } from "next/navigation";

export default function Main({ addressArray, userInfo }: { addressArray: userAddressProps[]; userInfo: User }) {
    const { cartItems } = useShoppingCart();
    const { isMobile } = useMobile();
    const params = useSearchParams();
    const [order, setOrder] = useState<cartProductCardProps[]>();
    const router = useRouter();
    useEffect(() => {
        if (params.get("order") === "All") {
            setOrder(cartItems);
        } else {
            setOrder(cartItems?.filter((item) => item.selected === true));
        }
    }, [cartItems, params]);

    const goToAddressPage = () => router.push("/mypage/address/create");
    const AddressNotFoundPopUp = AlertPopUpModal(
        "주소가 존재하지 않음",
        <div className="py-4">주소 등록 페이지로 이동합니다.</div>,
        "black-bar w-full",
        goToAddressPage
    );
    useEffect(() => {
        if (addressArray.length === 0) AddressNotFoundPopUp();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (order === undefined) return <PageLoading />;
    if (cartItems!.length === 0) redirect("/cart");
    if (order?.length === 0) redirect("/cart");
    if (addressArray.length == 0) return null;
    return (
        <>
            {isMobile ? (
                <MainMobile arr={order!} addressArray={addressArray} userInfo={userInfo} />
            ) : (
                <MainPc arr={order!} addressArray={addressArray} userInfo={userInfo} />
            )}
        </>
    );
}
