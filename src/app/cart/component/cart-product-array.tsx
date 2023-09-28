import { ProductCardSimple } from "./product-card-simple";
import { cartProductCardProps } from "../../type";

type ProductCardArray = {
    ProductCardArray: cartProductCardProps[];
};

export default function ProductCardSimpleArray({ ProductCardArray }: ProductCardArray) {
    return ProductCardArray.map((p: cartProductCardProps, i: number) => {
        const productImgUrl = `/product/${p.brand}/${p.productName} ${p.productId}/main.png`;
        return <ProductCardSimple key={i} productImgUrl={productImgUrl} {...p} />;
    });
}
