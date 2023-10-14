"use client";
import { useState } from "react";
import { ItemBoxShowAllProps, ItemBoxShowAllObjectProps, SizeObject } from "../type";

export interface InlineContentShowAllProps {
    contentList: SizeObject[];
    setContentList: (v: SizeObject[]) => void;
    showTitle: boolean;
}

// css
const itemBoxClass = "mondaL flex-center text-xs max-w-[200px] min-h-[30px] border-2 px-2 me-2 mb-2";
const checkedItem = "bg-main-black border-main-black cursor-pointer text-light-gray active:text-main-black shadow-md";
const notCheckedItem = "border-sub-black cursor-pointer text-sub-black active:text-main-black shadow-md";
const notSelctableItem = "border-deep-gray cursor-not-allowed line-through decoration-[2px] text-blue-black shadow-md";

// 아이템 박스 컴포넌트
const ItemBox = ({ type, size, checked, setChecked, exist }: ItemBoxShowAllProps) => {
    const status = exist ? (checked ? checkedItem : notCheckedItem) : notSelctableItem;

    return (
        <div className={`${itemBoxClass} ${status}`} onClick={() => setChecked(type, size)}>
            <div className="px-2">{size.toUpperCase()}</div>
        </div>
    );
};

// 기본 사이즈 중 해당 제품의 실 사이즈를 체크하는 함수
const matchDefaultWithExisting = (obj_size: string[], defaultSizeArray: string[]) => {
    return defaultSizeArray.map((defaultSize: string) => ({
        size: defaultSize,
        checked: true,
        exist: obj_size.includes(defaultSize),
    }));
};

const OptionArrayShowAll = ({ contentList, setContentList, showTitle = true }: InlineContentShowAllProps) => {
    // 1. load default size from env and stringify to Object
    // const defaultSizeArryString = process.env.NEXT_PUBLIC_DEFAULT_SIZE;
    // const defaultTypeObject = JSON.parse(defaultSizeArryString || "{}");

    // 2. matchDefaultWithExisting를 이용해 array 생성
    const arr: ItemBoxShowAllObjectProps[] = contentList.map((obj) => {
        // const defaultSizeArray = defaultTypeObject[obj["sizeType"]];
        const defaultSizeArray = obj["defaultSize"];
        return { sizeType: obj["sizeType"], sizeArray: matchDefaultWithExisting(obj["size"], defaultSizeArray) };
    });

    // create useState for itemBoxShowAll
    const [itemBoxArray, setItemBoxArray] = useState<ItemBoxShowAllObjectProps[]>(arr);

    // create Toggle
    const selectToggle = (type: string, size: string) => {
        const updateItemBox = (type: string, size: string) => {
            const newObject = itemBoxArray.map((obj) => {
                if (obj["sizeType"] === type) {
                    return {
                        ...obj,
                        sizeArray: obj["sizeArray"].map((s) => {
                            if (s["size"] === size) {
                                return { ...s, checked: !s["checked"] };
                            } else {
                                return s;
                            }
                        }),
                    };
                } else {
                    return obj;
                }
            });
            setItemBoxArray(newObject);
        };
        // 보여지는 상태 업데이트
        updateItemBox(type, size);

        const updateContentList = (type: string, size: string) => {
            const newContentList = contentList.map((obj) => {
                if (obj["sizeType"] === type) {
                    return {
                        ...obj,
                        size: obj["size"].includes(size)
                            ? obj["size"].filter((s) => s !== size)
                            : [...obj["size"], size],
                    };
                } else {
                    return obj;
                }
            });
            console.log("newContentList", newContentList);
            setContentList(newContentList);
        };
        // API call을 위한 사이즈 업데이트
        updateContentList(type, size);
    };

    return (
        <div className="w-full">
            {itemBoxArray.map((obj, idx) => {
                return (
                    <div key={idx}>
                        {showTitle && <div className="text-lg-xl text-sub-black pb-2">{obj["sizeType"]}</div>}
                        <div key={idx} className="flex-left flex-wrap">
                            {obj["sizeArray"].map((sizeObj, idx) => {
                                return (
                                    <div key={idx}>
                                        <ItemBox
                                            type={obj["sizeType"]}
                                            size={sizeObj["size"]}
                                            checked={sizeObj["checked"]}
                                            setChecked={selectToggle}
                                            exist={sizeObj["exist"]}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OptionArrayShowAll;
