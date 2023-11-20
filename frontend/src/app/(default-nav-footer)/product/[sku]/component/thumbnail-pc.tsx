import Image from "next/image";
import { ThumbnailProps } from "../type";

export default function Thumbnail({ brand, productName, productId, imgType }: ThumbnailProps) {
    const imageNameArray = ["main", "sub-1", "sub-2", "sub-3", "sub-4"];
    return (
        <div className="h-full overflow-auto pt-4 pe-5">
            {imageNameArray.map((imageName) => (
                <div key={imageName}>
                    <Image
                        src={`/product/${brand}/${productName} ${productId}/${imageName}.${imgType}`}
                        alt={`${productName} ${productId}`}
                        width={800}
                        height={800}
                        className="rounded-md mb-2"
                    />
                </div>
            ))}
        </div>
    );
}
