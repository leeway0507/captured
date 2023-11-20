import ProductInfo from "./component/product-info";
import ShipType from "./component/ship-type";

import RelatedProducts from "./component/recent-view-products";

import Thumbnail from "./component/thumbnail-pc";
import { productCardProps } from "@/app/type";

import SizeBox from "./component/size-box";
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
                    <div className="py-8 sticky top-[60px] min-w-[380px] max-w-[480px] flex flex-col gap-4">
                        <ProductInfo {...product} />
                        <SizeBox data={product} defaultSizeArr={defaultSizeArr} />
                        <ShipType intl={product.intl} />
                        <Infos />
                    </div>
                </div>
            </div>
            <div className="py-4">
                <RelatedProducts />
            </div>
        </div>
    );
}
