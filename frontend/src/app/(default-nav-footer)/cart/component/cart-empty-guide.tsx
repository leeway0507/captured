import { useRouter } from "next/navigation";

const CartEmptyGuide = ({ fontSize }: { fontSize: string }) => {
    const router = useRouter();
    const availableFontSize = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"];
    if (!availableFontSize.includes(fontSize)) {
        throw new Error("fontSize is not available");
    }
    const fontsizeidx = availableFontSize.indexOf(fontSize);

    return (
        <div className={`grow flex-center flex-col h-[60vh] text-${fontSize}`}>
            <div>장바구니가 비었습니다.</div>
            <div
                className={`link-animation underline text-gray-400 text-${availableFontSize[fontsizeidx - 1]} pt-5`}
                onClick={() => {
                    router.push("/category/latest");
                }}>
                구매하러 가기
            </div>
        </div>
    );
};

export default CartEmptyGuide;
