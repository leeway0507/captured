import ProductInfo from "./component/product-info";
import { IntlShipment, DomeShipment } from "@/app/components/notification/shipment-info";
import AccordionComponent from "@/app/components/accordion/accordion";
import RelatedProducts from "./component/related-products";
import ProductSpecificInfo from "./component/product-specific-info";
import Thumbnail from "./component/thumbnail-pc";
import { productCardProps } from "@/app/type";
import { headers } from "next/headers";
import { getCategory } from "@/app/category/[type]/component/fetch";
import { getProduct } from "./component/fetch";

import AddBasket from "./component/add-basket-client";

export default async function MainPc() {
    let data: productCardProps[] = await getCategory();

    const header_list = headers();
    const header_data = header_list.get("x-invoke-path") as string;
    const sku = header_data.split("/").slice(-1)[0];

    const product = data.find((v: productCardProps) => v.sku === parseInt(sku)) as productCardProps;

    if (!product) data = await getProduct(sku);

    return (
        <div className="w-full flex-col">
            <div className="flex justify-between">
                <div className="">
                    <Thumbnail {...product} />
                </div>
                <div className="flex flex-col justify-between ">
                    <div className="py-4 sticky top-0 w-[380px]">
                        <ProductInfo {...product} />
                        <AddBasket {...product} />
                        <div>
                            {product.intl ? (
                                <IntlShipment
                                    title="해외배송 상품"
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
            <div className="py-4">{/* <RelatedProducts arr={relatedProductsArray} /> */}</div>
        </div>
    );
}
