"use client";
import CreateAccount from "./main";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
    return (
        <>
            <div></div> {/* sticky 에러방지용 */}
            <div className="sticky top-0 w-full m-auto text-3xl flex-center bg-white z-50 py-4">
                <Link href="/" className="w-[150px] h-[80px] tb:w-[200px] tb:h-[100px] relative " scroll={false}>
                    <Image src="/icons/main-logo.svg" alt="main logo" fill />
                </Link>
            </div>
            <CreateAccount />
        </>
    );
}
