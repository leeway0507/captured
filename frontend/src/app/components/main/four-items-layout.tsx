import Image from "next/image";

export default async function FourItemsLayout() {
    return (
        <div className="mx-auto w-screen max-w-[1100px] h-full flex flex-col ">
            <div className="flex flex-col tb:flex-row">
                <div className="relative w-full aspect-[3/2] tb:aspect-[5/4] basis-[50%] p-8">
                    <Image
                        src={`/layout/human_made_1.jpg`}
                        alt="test"
                        sizes="1200px"
                        quality={95}
                        className="object-cover rounded tb:p-8"
                        fill
                        priority
                    />
                </div>
                <div className="basis-[50%] pt-4 pb-8 tb:pt-0 tb:flex-center">
                    <div className="flex flex-col px-4 ">
                        <div className="text-sm tb:text-lg">Human Made</div>
                        <div className="text-xl tb:text-3xl font-bold">KAWS MADE CUSHION</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col tb:flex-row tb:flex-row-reverse">
                <div className="relative w-full aspect-[3/2] tb:aspect-[5/4] basis-[50%]">
                    <Image
                        src={`/layout/human_made_2.jpg`}
                        alt="test"
                        sizes="1200px"
                        quality={95}
                        className="object-cover rounded tb:p-8"
                        fill
                        priority
                    />
                </div>
                <div className="basis-[50%] pt-4 pb-8 tb:pt-0 tb:flex-center ">
                    <div className="flex flex-col text-left px-4 tb:text-right">
                        <div className="text-sm tb:text-lg">Human Made</div>
                        <div className="text-xl tb:text-3xl font-bold">DRAGON HARIKO FIGURE</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
