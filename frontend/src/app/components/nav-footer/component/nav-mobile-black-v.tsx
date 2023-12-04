import Link from "next/link";
import Image from "next/image";

export default function NavMobile() {
    return (
        <div className="px-4 flex justify-between h-[50px] w-full bg-main-black w-screen">
            <Link href="/" className="flex-left font-test text-xl text-white tracking-[0.1rem] ">
                CAPTURED
            </Link>

            <div className="flex-center">
                <Link href="/search">
                    <Image
                        src={"/icons/white/search-input-white-mobile.png"}
                        alt="search"
                        width="24"
                        height="24"
                        priority
                    />
                </Link>
            </div>
        </div>
    );
}
