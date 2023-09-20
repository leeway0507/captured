import PersonalInfoForm from "@/app/mypage/component/personal-info-form";

export default function Page() {
    const test = {
        id: 4,
        productImgUrl: "/images/product/4.jpg",
        brand: "adidas originals",
        productName: "handball spezial black",
        productId: "db3021",
        size: "275",
        price: 140000,
        shippingFee: 3000,
        intl: false,
    };
    return (
        <div className="w-full flex flex-col" style={{ justifyContent: "center", display: "flex" }}>
            <PersonalInfoForm />
        </div>
    );
}
