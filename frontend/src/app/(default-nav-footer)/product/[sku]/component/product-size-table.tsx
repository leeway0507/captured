interface sizeInfo {
    sizeType: string;
    availableSize: string[];
    selectedItem: string;
    setSelectedItem: (v: string) => void;
    defaultSizeArr: string[];
}

interface itemBoxProps {
    size: string;
    selectedItem: string | undefined;
    setSelectedItem: (v: string) => void;
    exist: boolean;
}

// css
const itemBoxClass = "flex-center text-sm min-w-[55px] max-w-[150px] h-[30px] border rounded-sm";
const checkedItem = "bg-main-black border-main-black cursor-pointer text-light-gray shadow-md";
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
    // TODO: 특수 사이즈 표시를 위해 임시로 availablesize를 defaultSizeArr로 대체하고 있음. 사이즈 로직 수정이 필요
    const defaultStyleSize = availableSize.some((size) => defaultSizeArr.includes(size));

    return (
        <div className="flex flex-wrap gap-2 py-3">
            {defaultStyleSize
                ? defaultSizeArr.map((defaultSize: string) => {
                      return ItemBox({
                          size: defaultSize,
                          selectedItem: selectedItem,
                          setSelectedItem: setSelectedItem,
                          exist: availableSize.includes(defaultSize),
                      });
                  })
                : availableSize.map((size: string) => {
                      return ItemBox({
                          size: size,
                          selectedItem: selectedItem,
                          setSelectedItem: setSelectedItem,
                          exist: availableSize.includes(size),
                      });
                  })}
        </div>
    );
};

export default ProductSizeTable;
