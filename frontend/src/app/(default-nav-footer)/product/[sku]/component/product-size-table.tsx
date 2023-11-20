interface sizeInfo {
    sizeType: string;
    availableSize: string[];
    selectedItem: string;
    setSelectedItem: (v: string) => void;
    defaultSizeArr: string[];
}

interface itemBoxProps {
    type: string;
    size: string;
    selectedItem: string | undefined;
    setSelectedItem: (v: string) => void;
    exist: boolean;
}

// css
const itemBoxClass = "flex-center text-sm w-[55px] max-w-[120px] h-[30px] border rounded-sm";
const checkedItem = "bg-main-black border-main-black cursor-pointer text-light-gray active:text-main-black shadow-md";
const notCheckedItem = "border-sub-black cursor-pointer text-sub-black border-1 shadow-md";
const notSelctableItem = "border-deep-gray cursor-not-allowed line-through decoration-[2px] text-deep-gray shadow-md";

// 아이템 박스 컴포넌트
const ItemBox = ({ size, selectedItem, setSelectedItem, exist }: itemBoxProps) => {
    const status = exist ? (selectedItem == size ? checkedItem : notCheckedItem) : notSelctableItem;

    return (
        <div key={size} className={`${itemBoxClass} ${status}`} onClick={() => setSelectedItem(size)}>
            <div className="px-2">{size.toUpperCase()}</div>
        </div>
    );
};

const ProductSizeTable = (sizeInfo: sizeInfo) => {
    const { sizeType, availableSize, selectedItem, setSelectedItem, defaultSizeArr } = sizeInfo;

    return (
        <div className="flex flex-wrap gap-2">
            {defaultSizeArr.map((defaultSize: string) => {
                return ItemBox({
                    type: sizeType,
                    size: defaultSize,
                    selectedItem: selectedItem,
                    setSelectedItem: setSelectedItem,
                    exist: availableSize.includes(defaultSize),
                });
            })}
        </div>
    );
};

export default ProductSizeTable;
