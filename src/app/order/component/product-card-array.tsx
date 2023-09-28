import { productCardProps } from "@/app/type";
import ProductCard from "./product-card";

const OrderProducts = (cart: productCardProps[]) => {
    return cart.map((item: productCardProps, idx: number) => {
        return ProductCard({ ...item });
    });
};

export default OrderProducts;
