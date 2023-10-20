import AccordionComponent from "@/app/components/accordion/accordion";

export default function Main() {
    return (
        <div className="max-w-2xl w-full pt-4 pb-16 px-8 text-sm mx-auto flex-left flex-col">
            <div className={`${main} me-8`}>배송안내</div>
            <div className="w-full max-w-xl h-full">
                <AccordionComponent title="배송절차" content={process} cat="process" />
                <AccordionComponent title="배송비" content={shippingFee} cat="shippingFee" />
                <AccordionComponent title="교환 및 반품" content={refundAndExchange} cat="refundAndExchange" />
                <AccordionComponent title="관부가세 대납" content={customFee} cat="customFee" />
            </div>
        </div>
    );
}

const main = "text-4xl font-bold mb-4 w-full flex-center";
const title = "text-2xl font-bold mb-4 w-full";
const subTitle = "text-lg mb-2  w-full";
const process = (
    <div className="flex flex-col gap-2">
        <div>
            주문건에 대해영업일 기준 5 - 15일 내＊고객님께 상품을 전달드리고 있습니다.
            <div className="text-xs">∗ 물품 구매 및 현지 배송(1-5일) ➟ 국제 배송 및 통관(3-8일)➟ 국내 배송(1-2일)</div>
            <div className="text-xs">
                * 현지 판매처 사정(품절, 재입고 지연 등)에 의해 구매 주문이 취소될 수 있습니다.
            </div>
        </div>
    </div>
);
const shippingFee = (
    <div>
        <div className="pb-4">
            국내배송상품
            <div className="text-xs ps-1 pt-1">전체 : 3,000원</div>
        </div>

        <div>
            해외배송상품
            <div className="text-xs ps-1 pt-1">
                <div>가방 악세서리 모자 : 15,000원</div>
                <div>반팔 긴팔 셔츠 바지 반바지 : 15,000원</div>
                <div>가디건 코트 패딩 후리스 : 19,000원</div>
                <div>신발 : 19,000원</div>
            </div>
        </div>
    </div>
);
const refundAndExchange = (
    <div>
        <div className="pb-4 text-base">
            교환
            <div className="text-sm">판매처 재고가 있는 경우만 교환 진행 가능하며 추가 배송비가 발생합니다.</div>
        </div>
        <div className="pb-4 text-base">
            취소 및 반품
            <div>
                <div className="text-sm">
                    <div>
                        현지 판매처에 의한 배송지연의 경우(기상악화, 할인기간, 현지 공휴일 등) 취소/환불이 불가합니다.
                    </div>
                    <div>단순 변심 사유로 인해 취소/환불 시 국외 배송비 및 국내 배송비가 발생 됩니다.</div>
                    <div className="text-sm pt-2">
                        단순 변심 사유
                        <div className="text-xs ps-2 flex flex-col gap-1">
                            <div>• 주문 실수 및 단순 변심</div>
                            <div>• 모니터 해상도 차이에 의해 발생하는 색상 불일치</div>
                            <div className="flex">
                                <div>•&nbsp;</div>
                                <div>
                                    상품 추가 구성품(종이포장, 지지대, 택 등) 누락 및 상품 박스의 훼손이 발생하였지만
                                    물건에 이상 없는 경우
                                </div>
                            </div>
                            <div className="flex">
                                <div>•&nbsp;</div>
                                <div>
                                    신발 바닥의 오염, 겉면의 미세한 얼룩, 박음질, 본드자국, 신 발굽의 높낮이 차이,
                                    미세한 틀어짐, 양쪽 미세한 색상차이, 약간의 눌린 자국, 가죽 표면의 미세한 스크래치,
                                    주름, 가죽결 등 소재 특성에 따른 차이 등 모든 상품 퀄리티(완성도) 마감도와 관련한
                                    사항
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const customFee = <div>상품 가격에 관·부가세를 포함하고 있습니다.</div>;
