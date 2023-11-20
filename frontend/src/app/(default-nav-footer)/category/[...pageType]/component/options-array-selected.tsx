import { ItemBoxSelectedProps } from "../type";
import { useState } from "react";

// css
const itemBoxClass = " flex-center text-xs max-w-[200px] min-h-[30px] border-2 px-2 me-2 mb-2";
const checkedItem = "bg-main-black border-main-black cursor-pointer text-light-gray active:text-main-black shadow-md";
const notCheckedItem = "border-sub-black cursor-pointer text-sub-black active:text-main-black shadow-md";

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

//
export const OptionArraySelected = (contentList: Array<string>, setContentList: (v: string[]) => void) => {
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

export default OptionArraySelected;
