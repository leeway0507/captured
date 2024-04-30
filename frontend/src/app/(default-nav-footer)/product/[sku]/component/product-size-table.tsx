const sizeWeight: { [key: string]: number } = {
    XXXS: 1,
    XXS: 2,
    XS: 3,
    S: 4,
    M: 5,
    L: 6,
    XL: 7,
    XXL: 8,
    XXXL: 9,
    XXXXL: 10,
};

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
const itemBoxClass = "flex-center text-sm w-full h-[35px] border rounded-full whitespace-nowrap px-1";
const checkedItem = " border-main-black border-2 cursor-pointer shadow-sm";
const notCheckedItem = "border-gray-300 cursor-pointer text-gray-500 border-1 ";
const notSelctableItem = "border-deep-gray cursor-not-allowed line-through decoration-[2px] text-deep-gray ";

// 아이템 박스 컴포넌트
const ItemBox = ({ size, selectedItem, setSelectedItem, exist }: itemBoxProps) => {
    const status = exist ? (selectedItem == size ? checkedItem : notCheckedItem) : notSelctableItem;

    return (
        <div key={size} className={`${itemBoxClass} ${status}`} onClick={() => setSelectedItem(size)}>
            <div className="px-3">{size.toUpperCase()}</div>
        </div>
    );
};

const ProductSizeTable = (sizeInfo: sizeInfo) => {
    const { sizeType, availableSize, selectedItem, setSelectedItem, defaultSizeArr } = sizeInfo;
    // TODO: 특수 사이즈 표시를 위해 임시로 availablesize를 defaultSizeArr로 대체하고 있음. 사이즈 로직 수정이 필요
    const defaultStyleSize = availableSize.some((size) => defaultSizeArr.includes(size));

    const sortedSize = availableSize.sort((a, b) => sizeWeight[a] - sizeWeight[b]);

    return (
        <div
            className="gap-2 grid grid-flow-dense"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(70px, auto))" }}>
            {sortedSize.map((size: string) => {
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

// {defaultStyleSize
//     ? defaultSizeArr.map((defaultSize: string) => {
//           return ItemBox({
//               size: defaultSize,
//               selectedItem: selectedItem,
//               setSelectedItem: setSelectedItem,
//               exist: availableSize.includes(defaultSize),
//           });
//       })
//     : availableSize.map((size: string) => {
//           return ItemBox({
//               size: size,
//               selectedItem: selectedItem,
//               setSelectedItem: setSelectedItem,
//               exist: availableSize.includes(size),
//           });
//       })}
