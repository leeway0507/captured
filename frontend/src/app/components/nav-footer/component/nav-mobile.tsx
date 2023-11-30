import Link from "next/link";
import Image from "next/image";

export default function NavMobile() {
    return (
        <div className="px-4 flex justify-between h-[50px] w-full bg-white w-screen">
            <Link
                href="/"
                className="flex-left font-test text-xl py-3 text-rose-600 tracking-[0.1rem] "
                style={{ textShadow: "3px 2px 1px lightgrey" }}>
                CAPTURED
            </Link>

            <div className="flex-center">
                <Link href="/search">
                    <Image src={"/icons/white/search-input-white.svg"} alt="search" width="28" height="28" priority />
                </Link>
            </div>
        </div>
    );
}
