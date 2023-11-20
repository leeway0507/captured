"use client";
// import { useShoppingCart } from "@/app/components/context/shopping-cart-context";
import { ButtonModal, PopUpModal } from "@/app/components/modal/new-modal";
const Main = () => {
    const handler = PopUpModal("easy");

    return (
        <div className="w-full h-full flex-center">
            <button onClick={handler}>asd</button>
        </div>
    );
};

export default Main;
