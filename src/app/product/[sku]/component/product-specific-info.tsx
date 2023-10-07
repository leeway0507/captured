import { productCardProps } from "@/app/type";

//css
const row = "flex-left py-1";
const column1 = "basis-1/3 px-4";
const column2 = "basis-2/3 px-4";

export default function ProductSpecificInfo(props: productCardProps) {
    return (
        <div className="flex flex-col w-full text-sm-base">
            <div className={`${row} bg-light-gray`}>
                <div className={`${column1}`}>브랜드</div>
                <div className={`${column2} capitalize`}>{props.brand}</div>
            </div>
            <div className={`${row}`}>
                <div className={`${column1}`}>제품명</div>
                <div className={`${column2}`}>{props.productName}</div>
            </div>
            <div className={`${row} bg-light-gray`}>
                <div className={`${column1}`}>제품코드</div>
                <div className={`${column2}`}>{props.productId.toUpperCase()}</div>
            </div>
            <div className={`${row}`}>
                <div className={`${column1}`}>배송유형</div>
                <div className={`${column2}`}>{props.intl ? "해외배송" : "국내배송"}</div>
            </div>
            <div className={`${row} bg-light-gray`}>
                <div className={`${column1}`}>색상</div>
                <div className={`${column2}`}>
                    {JSON.parse(props.color).map((v: string, i: number) => {
                        return (
                            <span key={i} className="mx-1">
                                {v}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
