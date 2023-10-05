"use client";

import { useState } from "react";
import Thumbnail from "./component/thumbnail-mobile";
import ProductInfo from "./component/product-info";
import ProductSizeTable from "./component/product-size-table";
import { IntlShipment, DomeShipment } from "@/app/components/notification/shipment-info";
import AccordionComponent from "@/app/components/accordion/accordion";
import RelatedProducts from "./component/related-products";
import ProductSpecificInfo from "./component/product-specific-info";
import { productCardProps } from "@/app/type";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import AddBascketModal from "./component/add-bascket-modal";

export default function MobileMain(product: productCardProps) {
    const { brand, productName, productId, sku, imgType } = product;

    //api-call - 신발 재고 정보
    //status : 제작필요
    //type : GET
    //url : /api/product/:sku/size-info
    //function : get_size_info(sku:int) => {sizeType:string, size:string[]}
    const { sizeType, availableSize } = { sizeType: "신발", availableSize: ["230", "245", "250"] };

    const relatedProductsArray: productCardProps[] = [product, product, product, product, product, product];
    const productImgUrl = `/product/${brand}/${productName} ${productId}/main.${imgType}`;
    const [selectedItem, setSelectedItem] = useState<string>(availableSize[0]);
    const [openModal, setOpenModal] = useState(false);

    const { increaseCartQuantity } = useShoppingCart();

    function AddBascketToggle() {
        setOpenModal(true);
        increaseCartQuantity(sku, selectedItem);
    }

    return (
        <div className="flex flex-col justify-between w-full">
            <Thumbnail {...product} />
            <div className="m-4">
                <ProductInfo {...product} />
                <div className="pt-4 ">
                    <ProductSizeTable
                        sizeType={sizeType}
                        availableSize={availableSize}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                </div>
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
                <div className="py-4">
                    <div className="black-bar-xl my-4" onClick={AddBascketToggle}>
                        장바구니 담기
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
                    <RelatedProducts arr={relatedProductsArray} />
                </div>
            </div>
            <AddBascketModal
                {...product}
                size={selectedItem}
                quantity={1}
                openModal={openModal}
                setOpenModal={setOpenModal}
                productImgUrl={productImgUrl}
            />
        </div>
    );
}
