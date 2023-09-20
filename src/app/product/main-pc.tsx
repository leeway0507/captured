"use client";

import { useState } from "react";
import { useShoppingCart } from "@/app/shopping-cart-context";

import ProductInfo from "./component/product-title";
import { InlineContentShowAll } from "@/app/category/component/inline-content";
import { IntlShipment, DomeShipment } from "@/app/components/notification/shipment-info";
import AccordionComponent from "@/app/components/accordion/accordion";
import RelatedProducts from "./component/related-products";
import ProductSpecificInfo from "./component/product-specific-info";
import Thumbnail from "./component/thumbnail-pc";

export default function MobileMain() {
    const { mockDB } = useShoppingCart();
    const [product, setProduct] = useState(mockDB[1]);
    const [contentList, setContentList] = useState([{ sizeType: "신발", size: ["230", "245", "250"] }]);

    return (
        <div className="w-full flex-col">
            <div className="flex relative">
                <div className="basis-6/12">
                    <Thumbnail {...product} />
                </div>
                <div className="relative basis-6/12 flex flex-col justify-between w-full">
                    <div className="py-4 sticky top-[150px]">
                        <ProductInfo {...product} />
                        <div className="pt-4 ma">
                            <InlineContentShowAll
                                contentList={contentList}
                                setContentList={setContentList}
                                showTitle={false}
                            />
                        </div>
                        <div>
                            <div className="rounded my-4 flex-center p-3 bg-main-black text-white text-xl tracking-widest active:text-main-black active:bg-light-gray">
                                장바구니 담기
                            </div>
                        </div>
                        <div>
                            {product.intl ? (
                                <IntlShipment
                                    content="해당 제품은 해외 구매대행 상품입니다. 
                        상품 구입을 위해 고유 통관부호가 필요하며 5 ~ 15일의 배송기간이 소요 됩니다."
                                />
                            ) : (
                                <DomeShipment />
                            )}
                        </div>
                        <div>
                            <AccordionComponent
                                title={"제품 상세 정보"}
                                content={ProductSpecificInfo(product)}
                                cat={"product-info"}
                            />
                            <AccordionComponent
                                title={"배송 및 반품 안내"}
                                content={"hellowsdknaldnas asdlnasd asdasd ndjs,skdn sjsn"}
                                cat={"delivery-info"}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <RelatedProducts producInfos={mockDB} />
            </div>
        </div>
    );
}
