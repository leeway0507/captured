import { ProductCardSimple } from "./product-card-simple";
import type { cartProductCardProps } from "../type";

type ProductCardArray = {
    ProductCardArray: cartProductCardProps[];
};

export default function ProductCardSimpleArray({ ProductCardArray }: ProductCardArray) {
    return ProductCardArray.map((p: cartProductCardProps, i: number) => {
        const productImgUrl = "/product-img/" + `${p.brand} ${p.productName} ${p.productId}.png`;
        return <ProductCardSimple key={i} productImgUrl={productImgUrl} {...p} />;
    });
}
