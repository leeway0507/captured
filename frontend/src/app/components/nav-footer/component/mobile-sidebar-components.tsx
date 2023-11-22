import SignInOutButton from "./sign-btn";
import Link from "next/link";
import Image from "next/image";

const navArr = "font-bold basis-1/5 flex-left link-animation";

export function SearchBar({ search, setSearch }: { search: string; setSearch: (value: string) => void }) {
    return (
        <>
            <input
                type="text"
                placeholder="검색"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                className={`search-bar`}
                autoFocus={false}
            />
        </>
    );
}

export function MyPageSignINOut() {
    return (
        <div className="w-full flex bg-light-gray justify-between px-2 py-3">
            <Link href="/mypage">마이페이지</Link>
            <SignInOutButton />
        </div>
    );
}

export function NavArr() {
    return (
        <div className="flex flex-col gap-5 text-base py-2">
            <Link href="/category/latest" className={`${navArr}`}>
                LATEST
            </Link>
            <Link href="/brands" className={`${navArr}`}>
                BRAND
            </Link>
            <Link href="/category/shoes" className={`${navArr}`}>
                SHOES
            </Link>
            <Link href="/category/clothing" className={`${navArr}`}>
                CLOTHING
            </Link>
            <Link href="/category/accessory" className={`${navArr}`}>
                ACCESSORY
            </Link>
        </div>
    );
}

export function Instagram() {
    return (
        <>
            <Link href={process.env.NEXT_PUBLIC_INSTARGRAM_URL!} className="link-animation">
                <div className="flex-left py-1 m-auto">
                    <div className="">
                        <Image src="/icons/instagram.svg" width={12} height={12} alt="instagram" priority />
                    </div>
                    <div className="ms-1">인스타그램</div>
                </div>
            </Link>
        </>
    );
}
export function Custom() {
    return (
        <>
            <Link href={process.env.NEXT_PUBLIC_CUSTOM_ID_URL!} className="link-animation">
                <div className="flex-left py-1">
                    <div className=" flex-center">
                        <Image src="/icons/approval.svg" width={16} height={16} alt="instagram" priority />
                    </div>
                    <div className="ms-1">개인통관부호</div>
                </div>
            </Link>
        </>
    );
}
