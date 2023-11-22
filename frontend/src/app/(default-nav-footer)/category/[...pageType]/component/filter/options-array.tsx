import { ItemBoxSelectedProps } from "../../type";
import { useState } from "react";
// css
const itemBoxClass = "grow flex-1 flex-center text-sm min-h-[30px] border px-3 me-2 mb-2 rounded-sm";
const checkedItem = "bg-main-black border-main-black cursor-pointer text-light-gray active:text-main-black shadow-md";
const notCheckedItem = "border-sub-black cursor-pointer text-sub-black active:text-main-black shadow";

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

export const OptionArraySelected = (contentList: string[], setFilter: (v: string[]) => void) => {
    // create Array for ItemBoxSelected
    const itemBoxArray = contentList.map((content) => {
        return { content: content, checked: false };
    });

    // create useState for ItemBoxSelected
    const [itemBoxSelectedArray, setItemBoxSelectedArray] =
        useState<Array<{ content: string; checked: boolean }>>(itemBoxArray);

    // 내부 아이템 변동사항 보존용, initMeta는 건드려서는 안되고, set Filter로 내부 아이템을 건드리는 것은 한계가 있음.
    // 따라서 변동사항 보존용 state를 통해 이를 보존하고, 이를 setFilter로 넘겨주는 방식으로 구현함.
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // create Toggle
    const selectToggle = (value: string) => {
        const newContentList = selectedItems.includes(value)
            ? selectedItems.filter((c) => c !== value)
            : [...selectedItems, value];
        setSelectedItems(newContentList);
        setFilter(newContentList);
        console.log(newContentList);

        const newObject = itemBoxSelectedArray.map((obj) => {
            if (obj["content"] === value) {
                return { ...obj, checked: !obj["checked"] };
            } else {
                return obj;
            }
        });
        setItemBoxSelectedArray(newObject);
    };

    return (
        <div className="flex flex-wrap w-full">
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
    );
};

export default OptionArraySelected;
