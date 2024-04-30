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
import { checkAvailableSize } from "./component/fetch";

export default function Main({ addressArray, userInfo }: { addressArray: userAddressProps[]; userInfo: User }) {
    const { cartItems, removeFromCart } = useShoppingCart();
    const { isMobile } = useMobile();

    const { items, soldOutItems } = CheckSoldOutItems(cartItems);
    CheckAddress(addressArray);
    SoldOutModal(soldOutItems!, removeFromCart);

    if (items === undefined) return <PageLoading />;
    if (items?.length === 0) redirect("/cart");
    if (addressArray.length == 0) return null;

    return (
        <>
            {isMobile ? (
                <MainMobile arr={items!} addressArray={addressArray} userInfo={userInfo} />
            ) : (
                <MainPc arr={items!} addressArray={addressArray} userInfo={userInfo} />
            )}
        </>
    );
}

const CheckSoldOutItems = (cartItems: cartProductCardProps[] | undefined) => {
    const params = useSearchParams();

    const [items, setItems] = useState<cartProductCardProps[] | undefined>(undefined);
    const [soldOutItems, setSoldOutItems] = useState<cartProductCardProps[] | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            var items = cartItems;
            if (items == undefined) return setItems(undefined);
            if (params.get("order") !== "All") {
                items = cartItems?.filter((item) => item.selected === true);
            }
            const { availableSize, notAvailableSize } = await CheckSizeAvailable(items!);
            setItems(availableSize);
            setSoldOutItems(notAvailableSize);
        };
        fetchData();
    }, [cartItems, params]);

    return { items, soldOutItems };
};

const CheckSizeAvailable = async (cartItems: cartProductCardProps[]) => {
    const request = {
        form: cartItems?.map((v) => `${v.sku}-${v.size}`),
        sku: cartItems?.map((v) => v.sku),
    };
    const res = await checkAvailableSize(request).then((res) => res.data);

    const availableSize = cartItems?.filter((v) => {
        const key = `${v.sku}-${v.size}`;
        return res[key];
    });
    const notAvailableSize = cartItems?.filter((v) => {
        const key = `${v.sku}-${v.size}`;
        return !res[key];
    });

    return { availableSize, notAvailableSize };
};

const SoldOutModal = (soldOutItems: cartProductCardProps[], removeFromCart: any) => {
    useEffect(() => {
        if (soldOutItems?.length > 0) alertmodal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [soldOutItems]);
    const alertmodal = AlertPopUpModal(
        "품절 알림",
        <div className="py-4">장바구니 내 품절 제품이 있습니다.</div>,
        "black-bar w-full",
        () => deleteSoldout()
    );
    const deleteSoldout = () => soldOutItems?.map((s) => removeFromCart(s.sku, s.size));
};

const CheckAddress = (addressArray: userAddressProps[]) => {
    useEffect(() => {
        if (addressArray.length === 0) AddressNotFoundPopUp();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const router = useRouter();
    const AddressNotFoundPopUp = AlertPopUpModal(
        "주소가 존재하지 않습니다.",
        <div className="py-4">주소 등록 페이지로 이동합니다.</div>,
        "black-bar w-full",
        () => router.push("/mypage/address/create")
    );
};
