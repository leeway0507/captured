import Image from "next/image";
export default function Main() {
    return (
        <div className="max-w-4xl w-full m-auto py-8">
            <div className="flex-center flex-col">
                <div className="text-2xl tb:text-4xl pb-4 font-bold">전세계 숨은 재고를 찾아 검거하는</div>
                <div
                    className="font-test -rotate-[2.2deg] text-3xl tb:text-5xl text-rose-600 tracking-[0.2rem]"
                    style={{ textShadow: "2px 3px 1px lightgrey" }}>
                    CAPTURED
                </div>
            </div>
            <div className="text-base tb:py-16">
                <div className="flex flex-wrap tb:flex-nowrap pt-16 pb-8 px-4 gap-8">
                    <div className="tb:basis-2/5 pt-4">
                        <div className="text-2xl pb-2">믿음의 철칙</div>
                        합리적인 소비를 중시하는 1인 개발자에 의해 시작한 Captured는 전세계 20여개 나라 100여개 쇼핑몰에
                        흩어진 재고를 찾아 정보를 수집하고 있습니다. Captured는 단순 재고를 찾는 것을 넘어, 패션 분야의
                        빅데이터 분석을 통해 소비자가 원하는 상품을 파악하여 합리적인 소비 옵션을 제시하는 것을 목표로
                        하고 있습니다.
                    </div>
                    <div className="tb:basis-3/5 w-full ">
                        <div className="py-8 w-full relative aspect-video">
                            <Image
                                src="/icons/captured_map.png"
                                alt="captured_map"
                                fill
                                sizes="100vw"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap flex-col-reverse tb:flex-row tb:flex-nowrap py-8 tb:py-16 px-4 gap-8">
                    <div className="tb:basis-3/5 w-full ">
                        <div className="py-8 w-full relative aspect-video">
                            <Image
                                src="/icons/captured_logo.png"
                                alt="captured_logo"
                                fill
                                sizes="100vw"
                                className="rounded-md"
                            />
                        </div>
                    </div>
                    <div className="tb:basis-2/5 pt-4">
                        <div className="text-2xl pb-2">믿음의 철칙</div>
                        합리적인 소비를 중시하는 1인 개발자에 의해 시작한 Captured는 전세계 20여개 나라 100여개 쇼핑몰에
                        흩어진 재고를 찾아 정보를 수집하고 있습니다. Captured는 단순 재고를 찾는 것을 넘어, 패션 분야의
                        빅데이터 분석을 통해 소비자가 원하는 상품을 파악하여 합리적인 소비 옵션을 제시하는 것을 목표로
                        하고 있습니다.
                    </div>
                </div>
            </div>
        </div>
    );
}
