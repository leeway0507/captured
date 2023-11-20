import Link from "next/link";
import Image from "next/image";
import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
export default function CartBtn() {
    const { cartQuantity } = useShoppingCart();

    return (
        <>
            <Link href="/cart" className="h-full flex-right link-animation">
                <Image
                    src="/icons/shopping-cart.svg"
                    alt="shopping cart"
                    className="flex-right"
                    width={28}
                    height={28}
                    priority
                />
                <div className="text-sm ps-1">{cartQuantity}</div>
            </Link>
        </>
    );
}
