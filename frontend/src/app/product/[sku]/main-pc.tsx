import ProductInfo from "./component/product-info";
import { IntlShipment, DomeShipment } from "@/app/components/notification/shipment-info";
import AccordionComponent from "@/app/components/accordion/accordion";
import RelatedProducts from "./component/recent-view-products";
import ProductSpecificInfo from "./component/product-specific-info";
import Thumbnail from "./component/thumbnail-pc";
import { productCardProps } from "@/app/type";

import AddBasket from "./component/add-basket-client";
import Infos from "./component/infos";

export default async function MainPc({
    product,
    defaultSizeArr,
}: {
    product: productCardProps;
    defaultSizeArr: string[];
}) {
    return (
        <div className="w-full flex-col">
            <div className="flex justify-evenly">
                <div className="max-w-2xl">
                    <Thumbnail {...product} />
                </div>
                <div className="flex flex-col justify-between ">
                    <div className="py-8 sticky top-[60px] min-w-[380px] max-w-[480px]">
                        <ProductInfo {...product} />
                        <AddBasket data={product} defaultSizeArr={defaultSizeArr} />
                        <div>
                            {product.intl ? (
                                <IntlShipment
                                    title="해외배송 상품"
                                    content="영업일 기준 5-15일의 배송기간이 소요됩니다."
                                />
                            ) : (
                                <DomeShipment
                                    title="국내배송 상품"
                                    content="영업일 기준 1-3일의 배송기간이 소요됩니다."
                                />
                            )}
                        </div>
                        <div className="py-2">
                            <Infos />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <RelatedProducts />
            </div>
        </div>
    );
}
