import { ItemBoxSelectedProps } from "../type";
import { useState } from "react";

// css
const itemBoxClass = "grow  flex-1 flex-center text-sm min-h-[30px] px-2 me-2 mb-2";
const checkedItem = " cursor-pointer text-sub-black capitalize";
const notCheckedItem = " cursor-pointer text-gray-400 capitalize link-animation";

// ItemBox Component for selected
const ItemBoxSelected = ({ content, checked, setChecked }: ItemBoxSelectedProps) => {
    const status = checked ? checkedItem : notCheckedItem;
    return (
        <div className={`${itemBoxClass} ${status}`} onClick={() => setChecked(content)}>
            {content}
        </div>
    );
};

//
export const OptionArraySortBy = (contentList: Array<string>, setFilter: (v: string) => void) => {
    // create Array for ItemBoxSelected
    const itemBoxArray = [
        { content: "최신순", checked: true },
        { content: "인기순 ", checked: false },
        { content: "낮은 가격 순", checked: false },
        { content: "높은 가격 순", checked: false },
    ];

    // create useState for ItemBoxSelected
    const [itemBoxSelectedArray, setItemBoxSelectedArray] =
        useState<Array<{ content: string; checked: boolean }>>(itemBoxArray);

    // create Toggle
    const selectToggle = (newValue: string) => {
        setFilter(newValue);

        const newObject = itemBoxSelectedArray.map((obj) => {
            if (obj["content"] === newValue) {
                return { ...obj, checked: true };
            } else {
                return { ...obj, checked: false };
            }
        });
        setItemBoxSelectedArray(newObject);
    };

    return (
        <div className="w-full overflow-auto">
            <div className="flex flex-col">
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

export default OptionArraySortBy;
