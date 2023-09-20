"use client";
import { useState } from "react";
import {
    ItemBoxSelectedProps,
    ItemBoxShowAllProps,
    ItemBoxShowAllObjectProps,
    SizeObject,
    InlineContentShowAllProps,
} from "../type";

// css
const itemBoxClass = "mondaL flex-center text-xs max-w-[200px] min-h-[30px] border-2 px-2 me-2 mb-2";
const checkedItem = "bg-main-black border-main-black cursor-pointer text-light-gray active:text-main-black shadow-md";
const notCheckedItem = "border-sub-black cursor-pointer text-sub-black active:text-main-black shadow-md";
const notSelctableItem = "border-deep-gray cursor-not-allowed line-through decoration-[2px] text-blue-black shadow-md";

// ItemBox Component for selected
const ItemBoxSelected = ({ content, checked, setChecked }: ItemBoxSelectedProps) => {
    const status = checked ? checkedItem : notCheckedItem;
    return (
        <div className={`${itemBoxClass} ${status}`}>
            <div className="px-2" onClick={() => setChecked(content)}>
                {content.toUpperCase()}
            </div>
        </div>
    );
};

export const InlineContentShowSelected = (
    contentList: Array<string>,
    setContentList: React.Dispatch<React.SetStateAction<Array<string>>>
) => {
    // create Array for ItemBoxSelected
    const itemBoxArray = contentList.map((content) => {
        return { content: content, checked: true };
    });

    // create useState for ItemBoxSelected
    const [itemBoxSelectedArray, setItemBoxSelectedArray] =
        useState<Array<{ content: string; checked: boolean }>>(itemBoxArray);

    // create Toggle
    const selectToggle = (content: string) => {
        const newContentList = contentList.includes(content)
            ? contentList.filter((c) => c !== content)
            : [...contentList, content];
        setContentList(newContentList);

        const newObject = itemBoxSelectedArray.map((obj) => {
            if (obj["content"] === content) {
                return { ...obj, checked: !obj["checked"] };
            } else {
                return obj;
            }
        });
        setItemBoxSelectedArray(newObject);
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap">
                {itemBoxSelectedArray.map((content, idx) => {
                    return (
                        <div key={idx}>
                            <ItemBoxSelected
                                content={content.content}
                                checked={content.checked}
                                setChecked={selectToggle}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ItemBox Component for showAll
const ItemBoxShowAll = ({ type, size, checked, setChecked, exist }: ItemBoxShowAllProps) => {
    const status = exist ? (checked ? checkedItem : notCheckedItem) : notSelctableItem;

    return (
        <div className={`${itemBoxClass} ${status}`} onClick={() => setChecked(type, size)}>
            <div className="px-2">{size.toUpperCase()}</div>
        </div>
    );
};

export const InlineContentShowAll = ({ contentList, setContentList, showTitle = true }: InlineContentShowAllProps) => {
    //
    // load default size from env
    const envString = process.env.NEXT_PUBLIC_DEFAULT_SIZE;
    const defaultType = JSON.parse(envString || "{}");

    //match default size with existing size
    const matchDefaultWithExisting = (obj_size: Array<string>, defaultSizeArray: Array<string>) => {
        return defaultSizeArray.map((defaultSize: string) => ({
            size: defaultSize,
            checked: true,
            exist: obj_size.includes(defaultSize),
        }));
    };

    // create Array for itemBoxShowAll
    const itemBoxArray: ItemBoxShowAllObjectProps[] = contentList.map((obj) => {
        const defaultSizeArray = defaultType[obj["sizeType"]];
        return { sizeType: obj["sizeType"], sizeArray: matchDefaultWithExisting(obj["size"], defaultSizeArray) };
    });

    // create useState for itemBoxShowAll
    const [itemBoxShowAllArray, setItemBoxShowAllArray] = useState<ItemBoxShowAllObjectProps[]>(itemBoxArray);

    // create Toggle
    const selectToggle = (type: string, size: string) => {
        const updateItemBox = (type: string, size: string) => {
            const newObject = itemBoxShowAllArray.map((obj) => {
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
            setItemBoxShowAllArray(newObject);
        };

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
            setContentList(newContentList);
        };

        // 보여지는 상태 업데이트
        updateItemBox(type, size);

        // API call을 위한 사이즈 업데이트
        updateContentList(type, size);
    };

    return (
        <div className="w-full">
            {itemBoxShowAllArray.map((obj, idx) => {
                return (
                    <div key={idx}>
                        {showTitle && <div className="text-lg-xl text-sub-black pb-2">{obj["sizeType"]}</div>}
                        <div key={idx} className="flex flex-wrap pb-5">
                            {obj["sizeArray"].map((sizeObj, idx) => {
                                return (
                                    <div key={idx}>
                                        <ItemBoxShowAll
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
