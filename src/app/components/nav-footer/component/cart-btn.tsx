import Link from "next/link";
import Image from "next/image";
import { useShoppingCart } from "@/app/shopping-cart-context";
import PageLoading from "../../loading/page-loading";

export default function CartBtn() {
    const { cartQuantity } = useShoppingCart();
    // if (cartQuantity === undefined) {
    //     console.log("cart", cartQuantity);
    //     return <PageLoading />;
    // }
    return (
        <>
            <Link href="/cart" className="h-full flex-right link-animation">
                <Image
                    src="/icons/shopping-cart.svg"
                    alt="shopping cart"
                    className="flex-right"
                    width={24}
                    height={24}
                />
                <div className="text-sm ps-1">{cartQuantity}</div>
            </Link>
        </>
    );
}
