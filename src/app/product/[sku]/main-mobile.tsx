import Thumbnail from "./component/thumbnail-mobile";
import ProductInfo from "./component/product-info";
import { IntlShipment, DomeShipment } from "@/app/components/notification/shipment-info";
import AccordionComponent from "@/app/components/accordion/accordion";
import RelatedProducts from "./component/related-products";
import ProductSpecificInfo from "./component/product-specific-info";
import { productCardProps } from "@/app/type";
import AddBasket from "./component/add-basket-client";

export default async function MainMobile({
    product,
    defaultSizeArr,
}: {
    product: productCardProps;
    defaultSizeArr: string[];
}) {
    return (
        <div className="flex flex-col justify-between w-full">
            <Thumbnail {...product} />
            <div className="m-4">
                <ProductInfo {...product} />
                <div className="pt-4 ">
                    <AddBasket data={product} defaultSizeArr={defaultSizeArr} />
                    <div className="py-4">
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
                <div className="py-4">
                    <RelatedProducts />
                </div>
            </div>
        </div>
    );
}
