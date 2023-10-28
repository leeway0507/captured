import Thumbnail from "./component/thumbnail-mobile";
import ProductInfo from "./component/product-info";
import { IntlShipment, DomeShipment } from "@/app/components/notification/shipment-info";
import Infos from "./component/infos";
import RelatedProducts from "./component/recent-view-products";
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
                            <IntlShipment title="해외배송 상품" content="영업일 기준 5-15일의 배송기간이 소요됩니다." />
                        ) : (
                            <DomeShipment title="국내배송 상품" content="영업일 기준  1-3일의 배송기간이 소요됩니다." />
                        )}
                    </div>
                    <div className="py-2">
                        <Infos />
                    </div>
                </div>

                <div className="py-4">
                    <RelatedProducts />
                </div>
            </div>
        </div>
    );
}
