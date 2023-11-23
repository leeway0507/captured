import Thumbnail from "./component/thumbnail-mobile";
import ProductInfo from "./component/product-info";
import Infos from "./component/infos";
import RelatedProducts from "./component/recent-view-products";
import { productCardProps } from "@/app/type";
import SizeBoxMobile from "./component/size-box-mobile";
import ShipType from "./component/ship-type";

export default async function MainMobile({
    product,
    defaultSizeArr,
}: {
    product: productCardProps;
    defaultSizeArr: string[];
}) {
    return (
        <div className="flex flex-col justify-between w-full gap-2 pb-16">
            <Thumbnail {...product} />
            <ProductInfo {...product} />
            <SizeBoxMobile data={product} defaultSizeArr={defaultSizeArr} />
            <ShipType intl={product.intl} />
            <Infos />
            <RelatedProducts />
        </div>
    );
}
