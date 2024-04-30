import Image from "next/image";
import Logo from "@/app/components/nav-footer/component/logo";
export default function Main() {
    return (
        <div className="max-w-4xl w-full mx-auto py-4 tb:py-16  px-2 tb:px-24">
            <div className="flex-center flex-col pb-4">
                <div className="text-2xl tb:text-3xl pb-4 font-bold">전세계 숨은 재고를 검거하는</div>
                <Logo />
            </div>
            <div className="text-sm tb:text-lg tb:py-16 ">
                합리적인 소비를 중시하는 1인 개발자에 의해 시작한 CAPTURED는 전세계 20여개 나라 100여개 쇼핑몰에 흩어진
                재고를 찾아 정보를 수집하고 있습니다. CAPTURED는 단순 재고를 찾는 것을 넘어, 패션 분야의 빅데이터 분석을
                통해 소비자가 원하는 상품을 파악하여 합리적인 소비 옵션을 제시하는 것을 목표로 하고 있습니다.
            </div>
            <div className="relative w-full aspect-[2/1] mt-4">
                <Image src="/icons/captured_map.png" alt="captured_map" fill sizes="50vw" className="rounded-lg" />
            </div>
        </div>
    );
}
