import Link from "next/link";
import Image from "next/image";

export default function NavMobile() {
    return (
        <div className="px-4 flex justify-between h-[50px] w-full bg-white w-screen">
            <Link href="/" className="flex-left font-test text-xl text-rose-600 tracking-[0.05rem] pt-0.5 ">
                CAPTURED
            </Link>

            <div className="flex-center">
                <Link href="/search">
                    <Image src={"/icons/white/search-input-white.svg"} alt="search" width="24" height="24" priority />
                </Link>
            </div>
        </div>
    );
}
