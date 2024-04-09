import Thumbnail from "./component/thumbnail-mobile";
import ProductInfo from "./component/product-info";
import Infos from "./component/infos";
import RelatedProducts from "./component/recent-view-products";
import { productCardProps } from "@/app/type";
import SizeBoxMobile from "./component/size-box-mobile";
import ShipType from "./component/ship-type";
import Cart from "./component/cart";

export default async function MainMobile({
    product,
    defaultSizeArr,
}: {
    product: productCardProps;
    defaultSizeArr: string[];
}) {
    return (
        <>
            <Cart />
            <div className="flex flex-col justify-between w-full gap-2 pb-24">
                <Thumbnail {...product} />
                <div className="px-2 flex flex-col gap-2">
                    <ProductInfo {...product} />
                    <SizeBoxMobile data={product} defaultSizeArr={defaultSizeArr} />
                    <Infos />
                    <ShipType intl={product.intl} />
                    <RelatedProducts />
                </div>
            </div>
        </>
    );
}
