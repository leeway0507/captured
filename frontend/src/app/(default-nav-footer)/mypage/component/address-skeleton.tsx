import Link from "next/link";

const addressInfoClass = "text-base flex-right active:text-deep-gray cursor-pointer";

export const AddressSkeleton = () => (
    <div className="text-sm overflow-auto max-w-[500px] mx-auto px-2">
        <Link href="mypage/address/create" className={`${addressInfoClass}`}>
            + 신규 주소 추가
        </Link>
        <div className="overflow-auto pt-2">
            <div className="bg-light-gray border border-gray-50 rounded-2xl shadow ">
                <div className={`animate-pulse relative flex flex-col text-sm w-full gap-4 my-2 p-4`}>
                    <div className="absolute underline text-sub-black right-0 px-4 flex cursor-pointer">
                        <div className="ms-2 active:text-deep-gray h-5 w-15"></div>
                    </div>
                    <div className="flex w-full h-4 bg-gray-300 rounded-xl"></div>
                    <div className="flex w-full h-4 bg-gray-300 rounded-xl"></div>
                    <div className="flex w-full h-4 bg-gray-300 rounded-xl"></div>
                    <div className="flex w-full h-4 bg-gray-300 rounded-xl"></div>
                    <div className="flex w-full h-4 bg-gray-300 rounded-xl"></div>
                </div>
            </div>
            <div className="py-2" />
            <div className="bg-light-gray border border-gray-50 rounded-2xl shadow ">
                <div className={`animate-pulse relative flex flex-col text-sm w-full gap-4 my-2 p-4`}>
                    <div className="absolute underline text-sub-black right-0 px-4 flex cursor-pointer">
                        <div className="ms-2 active:text-deep-gray h-5 w-15"></div>
                    </div>
                    <div className="flex w-full h-4 bg-gray-300 rounded-xl"></div>
                    <div className="flex w-full h-4 bg-gray-300 rounded-xl"></div>
                    <div className="flex w-full h-4 bg-gray-300 rounded-xl"></div>
                    <div className="flex w-full h-4 bg-gray-300 rounded-xl"></div>
                    <div className="flex w-full h-4 bg-gray-300 rounded-xl"></div>
                </div>
            </div>
        </div>
    </div>
);
