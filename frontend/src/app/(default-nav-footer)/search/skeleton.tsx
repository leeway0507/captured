import EmblaCarouselMultiProducts from "@/app/components/carousel/EmblaCarouselMultiProducts";

export const SearchResultSkeleton = () => {
    return (
        <>
            <div className="flex-none py-2 px-4 rounded-2xl border text-sm bg-gray-200 animate-pulse">
                <div className="h-5 w-10 "></div>
            </div>
            <div className="flex-none py-2 px-4 rounded-2xl border text-sm bg-gray-200 animate-pulse">
                <div className="h-5 w-20 "></div>
            </div>
            <div className="flex-none py-2 px-4 rounded-2xl border text-sm bg-gray-200 animate-pulse">
                <div className="h-5 w-10 "></div>
            </div>
            <div className="flex-none py-2 px-4 rounded-2xl border text-sm bg-gray-200 animate-pulse">
                <div className="h-5 w-12 "></div>
            </div>
        </>
    );
};

export const RelatedProductsSkeleton = () => {
    const x = [1, 2, 3, 4, 5];
    return (
        <div className="flex flex-col grow flex-none ">
            <div className="text-xl-2xl pb-2 font-bold">최근 본 아이템</div>

            <div className="grow">
                <EmblaCarouselMultiProducts>
                    {x.map((v) => {
                        return (
                            <div key={v} className="embla__slide flex-center flex-col animate-pulse">
                                <div className="flex-center grow h-full w-full aspect-square bg-gray-300 rounded-xl"></div>
                                <div className="w-full rounded-full h-3 bg-gray-300 mt-2"></div>
                                <div className="w-full rounded-full h-3 bg-gray-300 mt-2"></div>
                            </div>
                        );
                    })}
                </EmblaCarouselMultiProducts>
            </div>
        </div>
    );
};
