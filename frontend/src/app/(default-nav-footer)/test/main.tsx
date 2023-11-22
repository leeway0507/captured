"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Main = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    console.log(isLoaded);
    return (
        <>
            <div></div>
            {isLoaded ? (
                <Image
                    src={
                        "https://d3hoea0p4wjde8.cloudfront.net/product/adidas originals/handball spezial black db3021/thumbnail.png"
                    }
                    alt={"s"}
                    className="rounded-md"
                    width="300"
                    height="300"
                />
            ) : (
                <Image
                    src={"/icons/skeleton.png"}
                    alt="search"
                    width="300"
                    height="300"
                    onLoadingComplete={() => setIsLoaded(true)}
                />
            )}
        </>
    );
};

export default Main;

// const Main = () => {
//     return (
//         <div className="m-2">
//             <div className="flex">
//                 <div className="flex-center m-2">
//                     <Image src={"/icons/white/goback-white.svg"} alt="search" width="28" height="28" />
//                 </div>
//                 <div className="h-[50px] w-full flex-center relative">
//                     <Image
//                         src={"/icons/white/search-input-white.svg"}
//                         alt="search-input"
//                         width="22"
//                         height="22"
//                         className="absolute left-0 ms-5"
//                     />
//                     <input
//                         type="text"
//                         className="h-[40px] w-full mx-4  rounded-md bg-light-gray border-none placeholder:ps-5"
//                         placeholder="검색"
//                     />
//                 </div>
//             </div>
//             <div>최근 검색어</div>
//             <div>최근 아이템</div>
//         </div>
//     );
// };

// export default Main;
