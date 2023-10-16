import Image from "next/image";

export default function Main() {
    return (
        <div className="max-w-2xl w-full flex-left flex-col m-auto py-16 px-4">
            <div className="flex-center flex-wrap">
                <div className="text-2xl tb:text-3xl whitespace-nowrap">전세계 숨은 재고를 찾아 검거하는</div>
                <div className="relative w-[200px] h-[100px] mx-4">
                    <Image src="/icons/main-logo.svg" alt="main logo" fill />
                </div>
            </div>

            <div className="text-sm pt-8 px-8">
                SEVENSTORE.com SEVENSTORE connects people to the ideas of community, technology and expression. Set in
                Liverpool’s post-industrial heartland, SEVENSTORE’s creative retail space places globally recognised
                fashion houses next to emerging talents. It is a consumer-focused space where like-minded creatives can
                share experiences through fashion, music, art and culture. Whether it be through digital workshops,
                artistic collaborations, panel discussions or live events, SEVENSTORE is a platform set out to merge
                local and global communities together while driving forward the future of fashion and creating unique,
                significant opportunities for creative minds.
            </div>
            <div className="text-sm pt-8 px-8">
                지도지도지도지도지도 SEVENSTORE.com SEVENSTORE connects people to the ideas of community, technology and
                expression. Set in Liverpool’s post-industrial heartland, SEVENSTORE’s creative retail space places
                globally recognised fashion houses next to emerging talents. It is a consumer-focused space where
                like-minded creatives can share experiences through fashion, music, art and culture. Whether it be
                through digital workshops, artistic collaborations, panel discussions or live events, SEVENSTORE is a
                platform set out to merge local and global communities together while driving forward the future of
                fashion and creating unique, significant opportunities for creative minds.
            </div>
        </div>
    );
}
